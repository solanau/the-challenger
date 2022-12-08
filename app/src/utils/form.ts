import { FieldType } from 'types/form';

export function getFieldDefaultValueByType(type: FieldType) {
    switch (type) {
        case 'number':
            return 0;
        default:
            return '';
    }
}
