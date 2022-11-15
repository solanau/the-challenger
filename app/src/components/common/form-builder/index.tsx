import Card from 'components/common/card';
import { FieldConfig } from 'types/form';

const FormBuilder = ({ config, formik }) => {
    const builder = (fieldConfig: FieldConfig, index: number) => {
        switch (fieldConfig.type) {
            case 'textArea':
                return (
                    <>
                        <div className="pt-4">
                            <label
                                htmlFor={fieldConfig.field}
                                className="block w-full border-none bg-transparent py-2 outline-none"
                            >
                                {++index}. {fieldConfig.label}
                            </label>

                            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary"
                                // baseChallenge={null}
                            >
                                <textarea
                                    id={fieldConfig.key}
                                    name={fieldConfig.field}
                                    className="fieldConfigs-center w-full bg-transparent outline-none"
                                    maxLength={fieldConfig.maxLength}
                                    rows={fieldConfig.rows}
                                    onChange={formik.handleChange}
                                    placeholder={fieldConfig.placeholder}
                                />
                            </Card>
                        </div>
                    </>
                );
            case 'text':
                return (
                    <>
                        <div className="pt-4">
                            <label
                                htmlFor={fieldConfig.field}
                                className="block w-full border-none bg-transparent py-2 outline-none"
                            >
                                {++index}. {fieldConfig.label}
                            </label>

                            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                                <input
                                    id={fieldConfig.key}
                                    name={fieldConfig.field}
                                    type={fieldConfig.type}
                                    className="fieldConfigs-center w-full bg-transparent outline-none"
                                    onChange={formik.handleChange}
                                    placeholder={fieldConfig.placeholder}
                                    maxLength={fieldConfig.maxLength}
                                />
                            </Card>
                        </div>
                    </>
                );
            case 'number':
            case 'email':
                return (
                    <>
                        <div className="pt-4">
                            <label
                                htmlFor={fieldConfig.field}
                                className="block w-full border-none bg-transparent py-2 outline-none"
                            >
                                {++index}. {fieldConfig.label}
                            </label>

                            <Card className="h-fit w-full p-5 transition-all duration-300 focus-within:border-3 focus-within:border-primary">
                                <input
                                    id={fieldConfig.key}
                                    name={fieldConfig.field}
                                    type={fieldConfig.type}
                                    className="fieldConfigs-center w-full bg-transparent outline-none"
                                    onChange={formik.handleChange}
                                    placeholder={fieldConfig.placeholder}
                                />
                            </Card>
                        </div>
                    </>
                );
            default:
                return <div>Field type not supported</div>;
        }
    };

    return (
        <>
            {config.map((fieldConfig: FieldConfig, index: number) => (
                <div key={fieldConfig.key}>{builder(fieldConfig, index)}</div>
            ))}
        </>
    );
};

export default FormBuilder;
