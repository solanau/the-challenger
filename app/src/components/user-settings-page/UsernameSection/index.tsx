import { Field, FormikErrors, FormikTouched } from 'formik';
import React from 'react';

interface UsernameSectionProps {
    isLoading: boolean;
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
}

const UsernameSection: React.FC<UsernameSectionProps> = ({ isLoading, errors, touched }) => {
    return (
        <div className="pt-8">
            <label htmlFor="user-user-name" className="block text-2xl font-medium mb-2 after:content-['*'] font-rubik sm:ml-10">
                Username
            </label>
            <Field
                id="user-user-name"
                name="userName"
                className="w-full rounded-2xl border border-zinc-200 text-2xl bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 sm:ml-10"
                placeholder="Enter your username"
                maxLength={80}
                required
                disabled={isLoading}
                autoComplete="off"
            />
            {errors.userName && touched.userName && <div className="mt-2">{errors.userName}</div>}
        </div>
    );
};

export default UsernameSection;
