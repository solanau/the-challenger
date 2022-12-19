export interface ParticipantPayload {
    userId: string;
    points: number;
}

export interface LeaderBoardPayload {
    totalPoints: number;
    participants: ParticipantPayload[];
}

export interface UpdateLeaderBoardPayload {
    eventId: string;
}
