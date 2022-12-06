import { EventSettingsFormData } from 'types/event';

export const fromEventSettingsFormData = (values: EventSettingsFormData) => ({
    ...values,
    startDate: new Date(values.startDate).getTime(),
    endDate: new Date(values.endDate).getTime(),
    managers: values.managers.split(',').map(manager => manager.trim()),
    reviewers: values.reviewers.split(',').map(reviewer => reviewer.trim()),
});
