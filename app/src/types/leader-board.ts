export interface ParticipantDto {
    userId: string;
    points: number;
}

export interface LeaderBoardDto {
    totalPoints: number;
    participants: ParticipantDto[];
}
