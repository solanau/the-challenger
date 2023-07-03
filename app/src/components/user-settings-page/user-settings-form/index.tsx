import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import { Field, FieldArray, Form, FormikErrors, FormikTouched, FormikValues, useFormikContext } from 'formik';
import { NextPage } from 'next';
import { useState } from 'react';
import { validateEmptyField } from 'utils/validations';

interface UserSettingsFormProps {
    isLoading?: boolean;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({
    isLoading = false,
    errors,
    touched
}) => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { values, setFieldValue } = useFormikContext<FormikValues>();

    useState(() => {
        setPreviewUrl('/pfp.png'); // Replace with the actual path to your default image
    });

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        setAvatar(file || null);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        } else {
            setPreviewUrl('/pfp.png');
        }
    };


    const formData = new FormData();
    formData.append('userName', values.userName);
    formData.append('fullName', values.fullName);
    formData.append('walletPublicKey', values.walletPublicKey);
    formData.append('avatar', avatar || '');
    formData.append('skills', JSON.stringify(values.skills));



    const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const skill = event.currentTarget.value.trim();
            if (skill !== '') {
                setFieldValue('skills', [...values.skills, skill]);
                event.currentTarget.value = '';
            }
        }
    };


    return (
        <Form>
            <div className="pt-4">
                <label htmlFor="user-avatar" className="block text-left mb-2 text-lg font-medium">Avatar</label>
                <div className="flex flex-col items-start">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">No Avatar</div>
                        )}
                    </div>
                    <input
                        id="user-avatar"
                        name="avatar"
                        type="file"

                        onChange={handleAvatarChange}
                        className="w-full"
                    />
                    {errors.avatar && touched.avatar && <div className="mt-2">{errors.avatar}</div>}
                </div>
            </div>
            <div className="pt-4">
                <label
                    htmlFor="user-user-name"
                    className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']"
                >
                    Username{' '}
                </label>

                <Field
                    id="user-user-name"
                    name="userName"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter your username"
                    maxLength={80}
                    required
                    validate={validateEmptyField}
                    disabled={isLoading}
                    autoComplete="off"
                />
                {errors.userName && touched.userName && <div className='mt-2'>{errors.userName}</div>}
            </div>
            <div className="pt-4">
                <label htmlFor="user-full-name" className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']">Full Name</label>
                <Field
                    id="user-full-name"
                    name="fullName"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter your full name"
                    maxLength={80}
                    required
                    validate={validateEmptyField}
                    disabled={isLoading}
                    autoComplete="off"
                />
                {errors.fullName && touched.fullName && <div className="mt-2">{errors.fullName}</div>}
            </div>

            <div className="pt-4">
                <label htmlFor="user-wallet-public-key" className="block w-full border-none bg-transparent py-2 outline-none after:text-primary after:content-['*']">Wallet Public Key</label>
                <Field
                    id="user-wallet-public-key"
                    name="walletPublicKey"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                    placeholder="Enter your wallet public key"
                    maxLength={80}
                    required
                    validate={validateEmptyField}
                    disabled={isLoading}
                    autoComplete="off"
                />
                {errors.walletPublicKey && touched.walletPublicKey && <div className="mt-2">{errors.walletPublicKey}</div>}
            </div>

            <div className="pt-4">
                <label htmlFor="user-skills" className="block text-lg font-medium mb-2">Skills</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    <FieldArray name="user-skills">
                        {({ push, remove }) => (
                            <>
                                {values.skills.map((skill, index) => (
                                    <div key={index} className="flex items-center border-2 border-purple-500 rounded text-purple-500 bg-transparent px-2">
                                        <span className="mr-2">{skill}</span>
                                        <button type="button" onClick={() => remove(index)} className="text-red-500 font-medium">X</button>
                                    </div>
                                ))}
                                <div className="relative">
                                    <input
                                        id="user-new-skill"
                                        className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500"
                                        placeholder="Enter a skill"
                                        maxLength={80}
                                        onKeyDown={handleSkillKeyDown}
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSkill = values.skills[values.skills.length - 1];
                                            if (newSkill && newSkill.trim() !== '') {
                                                push(newSkill.trim());
                                            }
                                        }}
                                        className="absolute top-0 right-0 h-full px-3 flex items-center justify-center text-primary font-medium focus:outline-none"
                                    >
                                        Add
                                    </button>
                                </div>
                            </>
                        )}
                    </FieldArray>
                </div>
            </div>

            <div className="width-full flex flex-row justify-end gap-2 pt-4">
                <Button type="submit" variant="purplefull" disabled={isLoading}>
                    {isLoading && <Spinner variant="large" />}
                    Submit
                </Button>
            </div>
        </Form>
    );
};

export default UserSettingsForm;
