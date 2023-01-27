import Button from 'components/common/button';
import FormBuilder from 'components/common/form-builder';
import Spinner from 'components/common/spinner';
import { Form } from 'formik';
import { NextPage } from 'next';
import { FieldConfig } from 'types/form';

interface CreateSubmissionFormProps {
    isLoading?: boolean;
    fieldsConfig: FieldConfig[];
}

const CreateSubmissionForm: NextPage<CreateSubmissionFormProps> = ({
    fieldsConfig,
    isLoading = false,
}) => (
    <Form>
        <FormBuilder fieldsConfig={fieldsConfig} disabled={isLoading} />

        <div className="flex w-full flex-row justify-end gap-2 pt-4">
            <Button
                type="submit"
                variant="orange"
                className="px-8"
                disabled={isLoading}
            >
                {isLoading && <Spinner variant="large"></Spinner>}
                Submit
            </Button>
        </div>
    </Form>
);

export default CreateSubmissionForm;
