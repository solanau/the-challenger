export interface BaseFieldConfig {
    field: string;
    label: string;
    key: string;
    placeholder: string;
    maxLength?: number;
}

export type TextFieldConfig = BaseFieldConfig & {
    type: 'text';
};

export type TextAreaFieldConfig = BaseFieldConfig & {
    type: 'textArea';
    rows?: number;
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
