import { ChallengePayload } from 'types/challenge';
import { EventSettingsFormData } from 'types/event';

export const fromEventSettingsFormData = (
    values: EventSettingsFormData,
    challenges: ChallengePayload[],
) => ({
    ...values,
    startDate: new Date(values.startDate).getTime(),
    endDate: new Date(values.endDate).getTime(),
    managers: values.managers.split(',').map(manager => manager.trim()),
    reviewers: values.reviewers.split(',').map(reviewer => reviewer.trim()),
    challenges: values.challenges.map((challengeId, index) => ({
        ...challenges.find(challenge => challenge.id === challengeId),
        position: index + 1,
    })),
});
