import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { Form, FormikErrors, FormikTouched, FormikValues, useField, useFormikContext } from 'formik';
import { NextPage } from 'next';
import React from 'react';
import AvatarSection from './../AvatarSection'; // Adjust the import path accordingly
import FullNameSection from './../FullNameSection';
import PublicProfileSection from './../PublicProfileSection';
import SkillsSection from './../SkillsSection';
import UsernameSection from './../UsernameSection';
import WalletPublicKeySection from './../WalletPublicKeySection';

interface UserSettingsFormProps {
    isLoading?: boolean;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({ isLoading = false, errors, touched }) => {
    const { values, setFieldValue } = useFormikContext<FormikValues>();
    const [, meta] = useField('skills');

    return (
        <Form>
            <AvatarSection isLoading={isLoading} errors={errors.avatar} touched={touched.avatar} />
            <UsernameSection isLoading={isLoading} errors={errors} touched={touched} />
            <FullNameSection isLoading={isLoading} errors={errors} touched={touched} />
            <WalletPublicKeySection isLoading={isLoading} errors={errors} touched={touched} />
            <SkillsSection values={values} setFieldValue={setFieldValue} meta={meta} isLoading={isLoading} />
            <PublicProfileSection values={values} setFieldValue={setFieldValue} />

            <div className="pt-8 flex justify-start ml-10">
                <Button type="submit" variant="purplefull" disabled={isLoading}>
                    {isLoading && <Spinner variant="large" />}
                    Save Profile
                </Button>
            </div>
        </Form>
    );
};

export default UserSettingsForm;