import Button from 'components/common/button';
import FormBuilder from 'components/common/form-builder';
import Spinner from 'components/common/spinner';
import { Form, Formik } from 'formik';
import { NextPage } from 'next';
import { FieldConfig } from 'types/form';
import { getFieldDefaultValueByType } from 'utils/form';

interface CreateSubmissionFormProps {
    isLoading?: boolean;
    fieldsConfig: FieldConfig[];
    handleConfirmSubmission: (values: { [key: string]: string }) => void
}

const CreateSubmissionForm: NextPage<CreateSubmissionFormProps> = ({
    fieldsConfig,
    isLoading = false,
    handleConfirmSubmission,
}) => (
    <Formik
        initialValues={fieldsConfig.reduce(
            (
                initialValues,
                field,
            ) => ({
                ...initialValues,
                [field.name]:
                    getFieldDefaultValueByType(
                        field.type,
                    ),
            }),
            {},
        )}
        onSubmit={
            handleConfirmSubmission
        }
    >
        {({ errors, touched, isValidating }) => (
            <Form>
                <FormBuilder fieldsConfig={fieldsConfig} disabled={isLoading} errors={errors} touched={touched} isValidating={isValidating} />

                <div className="width-full flex flex-row justify-end gap-2 pt-4">
                    <Button type="submit" variant="purplefull" className="px-8" disabled={isLoading}>
                        {isLoading && <Spinner variant="large"></Spinner>}
                        Submit
                    </Button>
                </div>
            </Form>
        )}
    </Formik>
);

export default CreateSubmissionForm;
