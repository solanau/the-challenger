import { EventSettingsFormData } from 'types/event';

export const fromEventSettingsFormData = (values: EventSettingsFormData) => ({
    ...values,
    startDate: new Date(values.startDate).getTime(),
    endDate: new Date(values.endDate).getTime(),
});
