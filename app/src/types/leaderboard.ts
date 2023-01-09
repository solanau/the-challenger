export interface ParticipantPayload {
    userId: string;
    points: number;
}

export interface LeaderboardPayload {
    totalPoints: number;
    participants: ParticipantPayload[];
}

export interface UpdateLeaderboardPayload {
    eventId: string;
}
