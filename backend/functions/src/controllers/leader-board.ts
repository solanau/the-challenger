import { db } from '..';
import {
    Auth,
    ChallengePayload,
    LeaderBoard,
    Participant,
    Submission,
    UpdateLeaderBoardPayload,
} from '../util/types';

function getProgress(min: number, max: number, value: number) {
    if (value < min) {
        return 0;
    } else if (value < max) {
        const total = max - min;
        const elapsed = value - min;

        return Math.floor((elapsed / total) * 100);
    } else {
        return 100;
    }
}

function getTimeBonusPoints(
    challenge: ChallengePayload,
    submissionDate: number,
) {
    const timeRewardPercentage = 20;
    const maxBonus = challenge.rewardValue * (timeRewardPercentage / 100);
    const progressLeft =
        100 -
        getProgress(
            new Date(challenge.startDate).getTime(),
            new Date(challenge.endDate).getTime(),
            new Date(submissionDate).getTime(),
        );

    return Math.floor(maxBonus * (progressLeft / 100));
}

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
            getTimeBonusPoints(challenge, submission.createdAt);

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
