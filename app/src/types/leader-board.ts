export interface ParticipantPayload {
    userId: string;
    points: number;
}

export interface LeaderBoardPayload {
    totalPoints: number;
    participants: ParticipantPayload[];
}
