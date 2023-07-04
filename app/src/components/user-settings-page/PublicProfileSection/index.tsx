import { Field, FormikValues } from 'formik';
import React from 'react';

interface PublicProfileSectionProps {
    values: FormikValues;
    setFieldValue: (field: string, value: any) => void;
}

const PublicProfileSection: React.FC<PublicProfileSectionProps> = ({ values, setFieldValue }) => {
    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setFieldValue(name, checked);
    };

    return (
        <div className="pt-8">
            <div className="block text-2xl font-medium mb-2 font-rubik sm:ml-10 mt-10">Public Profile Information</div>
            <div className="block text-xl text-gray-500 font-medium mb-2 font-rubik sm:ml-10 mt-3">
                Choose what information to display in your public profile
            </div>
            <div className="flex flex-col space-y-4 sm:ml-10 mt-3">
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

                <div className="flex items-center space-x-4 ">
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
    );
};

export default PublicProfileSection;
