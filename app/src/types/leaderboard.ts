export interface ParticipantPayload {
    userId: string;
    userName: string;
    fullName: string;
    email: string;
    userPublicKey: string;
    points: number;
    percentTotal: number;
}

export interface LeaderboardPayload {
    totalPoints: number;
    participants: ParticipantPayload[];
}

export interface UpdateLeaderboardPayload {
    eventId: string;
}
