import { FormikErrors, FormikTouched } from 'formik';
import React, { ChangeEvent, useState } from 'react';

interface AvatarSectionProps {
    isLoading: boolean;
    errors: string | string[] | FormikErrors<any> | FormikErrors<any>[];
    touched: boolean | FormikTouched<any> | FormikTouched<any>[];
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ isLoading, errors, touched }) => {
    const errorMessages = Array.isArray(errors) ? errors : [errors];
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    return (
        <div>
            {/* Render the error messages */}
            {errorMessages.map((error, index) => (
                <div key={index}>{error}</div>
            ))}

            {/* Avatar Section */}

            <div className="flex flex-col items-start">
                {/* Avatar preview */}
                <div className="w-40 h-40 rounded-full overflow-hidden mb-2 ml-5">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">No Avatar</div>
                    )}
                </div>

                {/* File input */}
                <div className="relative mt-2">
                    <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        onChange={handleAvatarChange}
                        className="hidden"
                        accept="image/*"
                    />
                    <button
                        type="button"
                        onClick={() => document.getElementById('avatar')?.click()}
                        className="bg-purple-800 text-white px-4 py-2 rounded-md ml-10"

                        disabled={isLoading}
                    >
                        Choose Avatar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarSection;



