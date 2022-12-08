import { Field } from 'formik';
import { FieldConfig } from 'types/form';

interface FormBuilderProps {
    fieldsConfig: FieldConfig[];
    disabled?: boolean;
}

const FormBuilder = ({ fieldsConfig, disabled = false }: FormBuilderProps) => {
    const builder = (
        fieldConfig: FieldConfig,
        index: number,
        disabled: boolean,
    ) => {
        switch (fieldConfig.type) {
            case 'textArea':
                return (
                    <>
                        <label
                            htmlFor={fieldConfig.name}
                            className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                        >
                            {++index}. {fieldConfig.label}&nbsp;
                        </label>

                        <Field
                            as="textarea"
                            id={fieldConfig.name}
                            name={fieldConfig.name}
                            className="w-full rounded-2xl border border-zinc-200 bg-zinc-200 bg-opacity-5 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-10 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                            placeholder={fieldConfig.placeholder}
                            maxLength={fieldConfig.maxLength}
                            rows={fieldConfig.rows}
                            required
                            disabled={disabled}
                            autoComplete="off"
                        />
                    </>
                );
            case 'text':
                return (
                    <>
                        <label
                            htmlFor={fieldConfig.name}
                            className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                        >
                            {++index}. {fieldConfig.label}&nbsp;
                        </label>

                        <Field
                            id={fieldConfig.name}
                            name={fieldConfig.name}
                            type={fieldConfig.type}
                            className="w-full rounded-2xl border border-zinc-200 bg-zinc-200 bg-opacity-5 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-10 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                            placeholder={fieldConfig.placeholder}
                            maxLength={fieldConfig.maxLength}
                            required
                            disabled={disabled}
                            autoComplete="off"
                        />
                    </>
                );
            case 'number':
            case 'email':
                return (
                    <>
                        <label
                            htmlFor={fieldConfig.name}
                            className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                        >
                            {++index}. {fieldConfig.label}&nbsp;
                        </label>

                        <Field
                            id={fieldConfig.name}
                            name={fieldConfig.name}
                            type={fieldConfig.type}
                            className="w-full rounded-2xl border border-zinc-200 bg-zinc-200 bg-opacity-5 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-10 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                            placeholder={fieldConfig.placeholder}
                            required
                            disabled={disabled}
                            autoComplete="off"
                        />
                    </>
                );
            default:
                return <div>Field type not supported</div>;
        }
    };

    return (
        <>
            {fieldsConfig.map((fieldConfig: FieldConfig, index: number) => (
                <div key={fieldConfig.name}>
                    {builder(fieldConfig, index, disabled)}
                </div>
            ))}
        </>
    );
};

export default FormBuilder;
