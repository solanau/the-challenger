import { Field, FormikErrors, FormikTouched, FormikValues } from 'formik';
import { FieldConfig } from 'types/form';
import { validateEmptyField } from 'utils/validations';

interface FormBuilderProps {
    fieldsConfig: FieldConfig[];
    disabled?: boolean;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
    isValidating: boolean;
}

const FormBuilder = ({ errors, touched, isValidating, fieldsConfig, disabled = false }: FormBuilderProps) => {

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
                            className="block w-full border-none bg-transparent pt-4 pb-2 outline-none after:text-primary after:content-['*']"
                        >
                            {++index}. {fieldConfig.question}{' '}
                        </label>

                        <Field
                            as="textarea"
                            id={fieldConfig.name}
                            name={fieldConfig.name}
                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                            placeholder={fieldConfig.placeholder}
                            maxLength={fieldConfig.maxLength}
                            rows={fieldConfig.rows}
                            validate={validateEmptyField}
                            disabled={disabled}
                            autoComplete="off"
                        />
                        {errors[fieldConfig.name] && touched[fieldConfig.name] && <div className='mt-2'>{errors[fieldConfig.name]}</div>}
                    </>
                );
            case 'text':
                return (
                    <>
                        <label
                            htmlFor={fieldConfig.name}
                            className="block w-full border-none bg-transparent pt-4 pb-2 outline-none after:text-primary after:content-['*']"
                        >
                            {++index}. {fieldConfig.question}{' '}
                        </label>

                        <Field
                            id={fieldConfig.name}
                            name={fieldConfig.name}
                            type={fieldConfig.type}
                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                            placeholder={fieldConfig.placeholder}
                            maxLength={fieldConfig.maxLength}
                            validate={validateEmptyField}
                            disabled={disabled}
                            autoComplete="off"
                        />
                        {errors[fieldConfig.name] && touched[fieldConfig.name] && <div className='mt-2'>{errors[fieldConfig.name]}</div>}
                    </>
                );
            case 'number':
            case 'email':
                return (
                    <>
                        <label
                            htmlFor={fieldConfig.name}
                            className="block w-full border-none bg-transparent  pt-4 pb-2 outline-none after:text-primary after:content-['*']"
                        >
                            {++index}. {fieldConfig.question}{' '}
                        </label>

                        <Field
                            id={fieldConfig.name}
                            name={fieldConfig.name}
                            type={fieldConfig.type}
                            className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                            placeholder={fieldConfig.placeholder}
                            validate={validateEmptyField}
                            disabled={disabled}
                            autoComplete="off"
                        />
                        {errors[fieldConfig.name] && touched[fieldConfig.name] && <div className='mt-2'>{errors[fieldConfig.name]}</div>}
                    </>
                );
            default:
                return <div>Field type not supported</div>;
        }
    };

    return (
        <>
            {fieldsConfig.map((fieldConfig: FieldConfig, index: number) => (
                <div key={fieldConfig.name} className="my-4 ">
                    {builder(fieldConfig, index, disabled)}
                </div>
            ))}
        </>
    );
};

export default FormBuilder;
