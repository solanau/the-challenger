export type ContractData = {
    eventChallengeId: string;
    eventId: string;
    eventPublicKey: string;
    challengeId: string;
    challengePublicKey: string;
    earnerId: string;
    earnerPublicKey: string;
    rewards: RewardData[];
};

export type RewardData = {
    mintPublicKey: string;
    quantity: number;
};
