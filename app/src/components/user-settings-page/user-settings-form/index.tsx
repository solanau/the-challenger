import Button from 'components/common/button';
import Spinner from 'components/common/spinner';
import {
    Field,
    Form,
    FormikErrors,
    FormikTouched,
    FormikValues,
    useField,
    useFormikContext
} from 'formik';
import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { validateEmptyField } from 'utils/validations';

interface UserSettingsFormProps {
    isLoading?: boolean;
    errors: FormikErrors<FormikValues>;
    touched: FormikTouched<FormikValues>;
}

interface ToggleState {
    [key: string]: boolean;
}

const UserSettingsForm: NextPage<UserSettingsFormProps> = ({
    isLoading = false,
    errors,
    touched,
}) => {
    const [avatar, setAvatar] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { values, setFieldValue } = useFormikContext<FormikValues>();
    const [, meta] = useField('skills');
    const [currentSkill, setCurrentSkill] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [toggles, setToggles] = useState<ToggleState>(() => ({
        toggleWalletAddress: values.toggleWalletAddress ?? false,
        toggleTotalChallenges: values.toggleTotalChallenges ?? false,
        toggleBadges: values.toggleBadges ?? false,
    }));

    useEffect(() => {
        setPreviewUrl('/pfp.png');
    }, []);

    const handleAvatarChange = () => {
        const file = fileInputRef.current?.files?.[0];
        setAvatar(file || null);

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewUrl(imageUrl);
        } else {
            setPreviewUrl('/pfp.png');
        }
    };

    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    const handleSkillKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (currentSkill.trim() !== '') {
                addSkill();
            }
        }
    };

    const addSkill = () => {
        const skill = currentSkill.trim();
        if (skill !== '') {
            setFieldValue('skills', [...values.skills, skill]);
            setCurrentSkill('');
        }
    };

    const handleRemoveSkill = (index: number) => {
        const updatedSkills = [...values.skills];
        updatedSkills.splice(index, 1);
        setFieldValue('skills', updatedSkills);
    };

    const skillsValid =
        values.skills.length <= 25 &&
        values.skills.every((skill) => skill !== '') &&
        values.skills.length === new Set(values.skills).size;

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFieldValue(name, checked);
    };
    useEffect(() => {
        setToggles({
            toggleWalletAddress: values.toggleWalletAddress ?? false,
            toggleTotalChallenges: values.toggleTotalChallenges ?? false,
            toggleBadges: values.toggleBadges ?? false,
        });
    }, [values.toggleWalletAddress, values.toggleTotalChallenges, values.toggleBadges]);


    return (
        <Form>
            <div className="pt-4">
                <label htmlFor="user-avatar" className="block text-left mb-2 text-2xl font-medium mb-6 ml-10">
                    Avatar
                </label>
                <div className="flex flex-col items-start">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-2">
                        {previewUrl ? (
                            <img src={previewUrl} alt="Avatar Preview" className="w-full h-full object-cover items-center" />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">No Avatar</div>
                        )}
                    </div>
                    <div className="relative mt-2 ml-6">
                        <Button type="button" variant="purplefull" onClick={handleFileInputClick} disabled={isLoading}>
                            Choose File
                        </Button>
                        <input id="user-avatar" name="avatar" type="file" ref={fileInputRef} onChange={handleAvatarChange} className="hidden" />
                    </div>
                    {errors.avatar && touched.avatar && <div className="mt-2">{errors.avatar}</div>}
                </div>
            </div>

            <div className="pt-8">
                <label htmlFor="user-user-name" className="block text-2xl font-medium mb-2 after:content-['*'] font-rubik ml-10">
                    Username
                </label>
                <Field
                    id="user-user-name"
                    name="userName"
                    className="w-full rounded-2xl border border-zinc-200 text-2xl bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 ml-10"
                    placeholder="Enter your username"
                    maxLength={80}
                    required
                    validate={validateEmptyField}
                    disabled={isLoading}
                    autoComplete="off"
                />
                {errors.userName && touched.userName && <div className="mt-2">{errors.userName}</div>}
            </div>

            <div className="pt-8">
                <label htmlFor="user-full-name" className="block text-2xl font-medium mb-2 after:content-['*'] font-rubik ml-10">
                    Full Name
                </label>
                <Field
                    id="user-full-name"
                    name="fullName"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 ml-10"
                    placeholder="Enter your full name"
                    maxLength={80}
                    required
                    validate={validateEmptyField}
                    disabled={isLoading}
                    autoComplete="off"
                />
                {errors.fullName && touched.fullName && <div className="mt-2">{errors.fullName}</div>}
            </div>

            <div className="pt-8">
                <label htmlFor="user-wallet-public-key" className="block text-2xl font-medium mb-2 after:content-['*'] font-rubik ml-10">
                    Wallet Public Key
                </label>
                <Field
                    id="user-wallet-public-key"
                    name="walletPublicKey"
                    className="w-full rounded-2xl border border-zinc-200 bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 ml-10"
                    placeholder="Enter your wallet public key"
                    maxLength={80}
                    required
                    validate={validateEmptyField}
                    disabled={isLoading}
                    autoComplete="off"
                />
                {errors.walletPublicKey && touched.walletPublicKey && <div className="mt-2">{errors.walletPublicKey}</div>}
            </div>

            <div className="pt-8">
                <label htmlFor="user-skills" className="block text-2xl font-medium mb-2 font-rubik ml-10">
                    Skills
                </label>
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-grow">
                        <div className="flex items-center">
                            <input
                                id="user-new-skill"
                                className={`w-full rounded-2xl border ${skillsValid ? 'border-zinc-200' : 'border-red-500'} bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 ml-10`}
                                placeholder="Enter a skill"
                                maxLength={80}
                                value={currentSkill}
                                onChange={(e) => setCurrentSkill(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                                autoComplete="off"
                                disabled={isLoading || values.skills.length >= 25 || !skillsValid}
                            />
                            <Button
                                type="button"
                                onClick={addSkill}
                                variant="purple"
                                className="w-1/5 text-white font-medium ml-2 rounded-lg"
                                disabled={isLoading || values.skills.length >= 25 || !skillsValid}
                            >
                                Enter
                            </Button>
                        </div>
                    </div>
                </div>
                {!skillsValid && meta.touched && <div className="mt-2 text-red-500 ml-10">Please make sure the skills are valid.</div>}
                <div className="flex flex-wrap gap-2 ml-10">
                    {values.skills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gradient-to-b from-zinc-900 via-black to-black p-3 rounded-3xl text-white text-lg border border-purple-500 transform transition-all duration-500 hover:scale-105"
                        >
                            <span>{skill}</span>
                            <button type="button" onClick={() => handleRemoveSkill(index)} className="text-white font-medium ml-5">
                                X
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8">
                <div className="block text-2xl font-medium mb-2 font-rubik ml-10 mt-10">Public Profile Information</div>
                <div className="block text-xl text-gray-500 font-medium mb-2 font-rubik ml-10 mt-3">
                    Choose what information to display in your public profile
                </div>
                <div className="flex flex-col space-y-4 ml-10 mt-3">
                    <div className="flex items-center space-x-4">
                        <Field
                            type="checkbox"
                            id="toggleWalletAddress"
                            name="toggleWalletAddress"
                            className="hidden"
                            onChange={handleToggle}
                            checked={values.toggleWalletAddress}
                        />
                        <label
                            htmlFor="toggleWalletAddress"
                            className={`relative inline-block w-12 h-7 transition-colors duration-300 ease-out cursor-pointer rounded-xl ${values.toggleWalletAddress ? 'bg-green-400' : 'bg-gray-400'
                                }`}
                        >
                            <div
                                className={`absolute block w-6 h-6 mt-1 rounded-full bg-white shadow-md transition-transform ease-in-out duration-300 ${values.toggleWalletAddress ? 'translate-x-full' : 'translate-x-0'
                                    }`}
                            />
                        </label>
                        <span className="text-lg font-medium text-gray-700">walletAddress</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Field
                            type="checkbox"
                            id="toggleTotalChallenges"
                            name="toggleTotalChallenges"
                            className="hidden"
                            onChange={handleToggle}
                            checked={values.toggleTotalChallenges}
                        />
                        <label
                            htmlFor="toggleTotalChallenges"
                            className={`relative inline-block w-12 h-7 transition-colors duration-300 ease-out cursor-pointer rounded-xl ${values.toggleTotalChallenges ? 'bg-green-400' : 'bg-gray-400'
                                }`}
                        >
                            <div
                                className={`absolute block w-6 h-6 mt-1 rounded-full bg-white shadow-md transition-transform ease-in-out duration-300 ${values.toggleTotalChallenges ? 'translate-x-full' : 'translate-x-0'
                                    }`}
                            />
                        </label>
                        <span className="text-lg font-medium text-gray-700">Completed Challenges</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Field
                            type="checkbox"
                            id="toggleBadges"
                            name="toggleBadges"
                            className="hidden"
                            onChange={handleToggle}
                            checked={values.toggleBadges}
                        />
                        <label
                            htmlFor="toggleBadges"
                            className={`relative inline-block w-12 h-7 transition-colors duration-300 ease-out cursor-pointer rounded-xl ${values.toggleBadges ? 'bg-green-400' : 'bg-gray-400'
                                }`}
                        >
                            <div
                                className={`absolute block w-6 h-6 mt-1 rounded-full bg-white shadow-md transition-transform ease-in-out duration-300 ${values.toggleBadges ? 'translate-x-full' : 'translate-x-0'
                                    }`}
                            />
                        </label>
                        <span className="text-lg font-medium text-gray-700">Badges</span>
                    </div>
                </div>
            </div>

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
