import { db } from '..';
import {
    Auth,
    LeaderBoard,
    Participant,
    Submission,
    UpdateLeaderBoardPayload,
} from '../util/types';
import { getTimeBonusPoints } from '../util/util';

function groupParticipants(
    dictionaries: {
        participantsGroupedByPoints: { [key: number]: string[] };
        participantsLookUp: { [key: string]: number };
    },
    participant: Participant,
): {
    participantsGroupedByPoints: { [key: number]: string[] };
    participantsLookUp: { [key: string]: number };
} {
    return {
        participantsGroupedByPoints: {
            ...dictionaries.participantsGroupedByPoints,
            [participant.points]: [
                ...(dictionaries.participantsGroupedByPoints[
                    participant.points
                ] ?? []),
                participant.userId,
            ],
        },
        participantsLookUp: {
            ...dictionaries.participantsLookUp,
            [participant.userId]: participant.points,
        },
    };
}

function splitParticipants(participantsGroupedByPoints: {
    [key: number]: string[];
}) {
    return Object.keys(participantsGroupedByPoints)
        .sort((a, b) => Number(b) - Number(a))
        .reduce<Participant[]>(
            (allParticipants, points) =>
                allParticipants.concat(
                    participantsGroupedByPoints[Number(points)].map(userId => ({
                        userId,
                        points: Number(points),
                    })),
                ),
            [],
        );
}

function getParticipantsTotal(participantsLookUp: { [key: string]: number }) {
    return Object.values(participantsLookUp).reduce(
        (totalPoints, points) => totalPoints + points,
        0,
    );
}

function updateLeaderBoard(
    leaderBoard: LeaderBoard,
    submissions: Submission[],
): LeaderBoard {
    const { participantsGroupedByPoints, participantsLookUp } =
        leaderBoard.participants.reduce(groupParticipants, {
            participantsGroupedByPoints: {},
            participantsLookUp: {},
        });

    submissions.forEach((submission, index) => {
        const { userId, challenge } = submission;
        const totalPoints =
            challenge.rewardValue +
            getTimeBonusPoints(
                challenge.rewardValue,
                challenge.startDate,
                challenge.endDate,
                submission.createdAt,
            );

        if (!participantsLookUp[userId]) {
            participantsLookUp[userId] = totalPoints;
            participantsGroupedByPoints[totalPoints] = [
                ...(participantsGroupedByPoints[totalPoints] ?? []),
                userId,
            ];
        } else {
            // remove the participant from his current position at dic one [participantsGroupedByPoints] (1) and delete the key if value is empty -> []
            const participantRemoved = participantsGroupedByPoints[
                participantsLookUp[userId]
            ].filter(participant => participant !== userId);

            if (participantRemoved.length === 0) {
                delete participantsGroupedByPoints[participantsLookUp[userId]];
            } else {
                participantsGroupedByPoints[participantsLookUp[userId]] =
                    participantRemoved;
            }

            // add participant in the new position based of the points
            participantsGroupedByPoints[
                participantsLookUp[userId] + totalPoints
            ] = [
                ...(participantsGroupedByPoints[
                    participantsLookUp[userId] + totalPoints
                ] ?? []),
                userId,
            ];

            // update the participant current points at dict two [participantsLookUp] (2) // END
            participantsLookUp[userId] =
                participantsLookUp[userId] + totalPoints;
        }
    });

    return {
        participants: splitParticipants(participantsGroupedByPoints),
        totalPoints: getParticipantsTotal(participantsLookUp),
    };
}

class LeaderBoardController {
    async updateLeaderBoard(auth: Auth, payload: UpdateLeaderBoardPayload) {
        const unProcessedSubmissions = await db
            .collection(`events/${payload.eventId}/submissions`)
            .where('isProcessed', '==', false)
            .where('status', '==', 'completed')
            .get();
        const unProcessedSubmissionsData = unProcessedSubmissions.docs.map(
            doc =>
                ({
                    id: doc.id,
                    ...doc.data(),
                } as Submission),
        );
        const leaderBoard = await db
            .doc(`events/${payload.eventId}/leader-boards/individual`)
            .get();
        const leaderBoardData = (leaderBoard.data() ?? {
            participants: [],
            totalPoints: 0,
        }) as LeaderBoard;

        // save updated leader board
        await db.doc(`events/${payload.eventId}/leader-boards/individual`).set({
            ...updateLeaderBoard(leaderBoardData, unProcessedSubmissionsData),
            updatedAt: Date.now(),
        });

        // mark unprocessed submissions as processed
        await Promise.all(
            unProcessedSubmissionsData.map(submission =>
                db
                    .doc(
                        `events/${payload.eventId}/submissions/${submission.id}`,
                    )
                    .update({
                        isProcessed: true,
                    }),
            ),
        );

        return { ok: true };
    }
}

export const controller = new LeaderBoardController();
