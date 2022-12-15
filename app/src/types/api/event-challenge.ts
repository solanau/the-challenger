import { ChallengeData } from './challenge';
import { ContractData, RewardData } from './contract';
import { SubmissionData } from './submission';

export type CreateEventChallengePayload = Partial<ChallengeData> & {
    title: string;
    description: string;
    tags: string;
};

export type UpdateEventChallengePayload = Partial<EventChallengeData> & {
    id: string;
};

export type CreateUpdateEventChallengeResponse = Partial<EventChallengeData> & {
    id: string;
    publicKey: string;
};

export type EventChallengeData = ChallengeData & {
    eventId: string;
    eventPublicKey: string;
    contracts: ContractData[];
    rewards: RewardData[];
    submissions: SubmissionData[];
};
