import Button from 'components/common/button';
import React, { useState } from 'react';
interface SkillsSectionProps {
    values: any;
    setFieldValue: (field: string, value: any) => void;
    meta: any;
    isLoading?: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ values, setFieldValue, meta, isLoading = false }) => {
    const [currentSkill, setCurrentSkill] = useState('');

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
        values.skills.every((skill: string) => skill !== '') &&
        values.skills.length === new Set(values.skills).size;

    return (
        <div className="pt-8">
            <label htmlFor="user-skills" className="block text-2xl font-medium mb-2 font-rubik sm:ml-10">
                Skills
            </label>
            <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-grow">
                    <div className="flex items-center">
                        <input
                            id="user-new-skill"
                            className={`w-full rounded-2xl border ${skillsValid ? 'border-zinc-200' : 'border-red-500'} bg-base bg-opacity-70 p-3.5 outline-none transition-all duration-300 focus:border-3 focus:border-primary focus:bg-opacity-50 focus:p-3 disabled:cursor-not-allowed disabled:text-zinc-500 sm:ml-10`}
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
                            className="w-1/5 text-white font-medium ml-2 rounded-lg "
                            disabled={isLoading || values.skills.length >= 25 || !skillsValid}
                        >
                            Enter
                        </Button>
                    </div>
                </div>
            </div>
            {!skillsValid && meta.touched && <div className="mt-2 text-red-500 ml-10">Please make sure the skills are valid.</div>}
            <div className="flex flex-wrap gap-2 ml-10">
                {values.skills.map((skill: string, index: number) => (
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
    );
};

export default SkillsSection;
