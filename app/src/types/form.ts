export type FieldType = 'text' | 'textArea' | 'number' | 'email';

export interface BaseFieldConfig {
    field: string;
    label: string;
    placeholder: string;
}

export type TextFieldConfig = BaseFieldConfig & {
    type: 'text';
    maxLength?: number;
};

export type TextAreaFieldConfig = BaseFieldConfig & {
    type: 'textArea';
    rows?: number;
    maxLength?: number;
};

export type NumberFieldConfig = BaseFieldConfig & {
    type: 'number';
};

export type EmailFieldConfig = BaseFieldConfig & {
    type: 'email';
};

export type FieldConfig =
    | TextFieldConfig
    | TextAreaFieldConfig
    | NumberFieldConfig
    | EmailFieldConfig;
