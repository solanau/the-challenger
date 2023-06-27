import { AcademicCapIcon, CogIcon, CurrencyDollarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Text from 'components/common/text';
import { useState } from 'react';

const IntroInformation = () => {
    const [selectedBlock, setSelectedBlock] = useState({ ...data[0], index: 0 });

    const handleCardClick = (block, index) => {
        setSelectedBlock(selectedBlock?.index === index ? null : { ...block, index });
    };

    return (
        <div className="container mx-auto mt-8 px-4">
            <Text variant="big-heading" className="text-white text-center items-center mt-20">
                The Ultimate Education Tool for Your Events
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-10">
                {data.map((block, index) => (
                    <div
                        key={index}
                        className={`relative flex flex-col items-center p-8 sm:p-12 cursor-pointer md:p-16 bg-gray-800 rounded-xl shadow-lg bg-gradient-to-b from-zinc-900 via-black to-black ${selectedBlock?.index === index ? 'ring-1 ring-white z-10' : ''
                            }`}
                        onClick={() => handleCardClick(block, index)}
                    >
                        <div className="h-12 w-12 mb-4 text-white hover:text-blue-500">
                            <block.icon className="h-full w-full" aria-hidden="true" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2 hover:text-blue-500">
                            {block.title}
                        </h2>
                    </div>
                ))}
            </div>
            <div className={`transform transition-transform duration-500 ease-in-out ${selectedBlock ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                {selectedBlock && (
                    <div className="w-full md:w-3/4 mx-auto bg-gray-800 rounded-b-xl shadow-lg p-8 space-y-4 mt-8 mb-4 bg-gradient-to-b from-black via-black to-black border-zinc-800 border mx-20 transition-all duration-500 rounded-2xl h-auto">
                        <div className="h-12 w-12 mb-4 text-white">
                            <selectedBlock.icon className="h-full w-full" aria-hidden="true" />
                        </div>
                        <h2 className="text-6xl font-bold text-white mb-2">{selectedBlock.title}</h2>
                        <p className="text-gray-300">{selectedBlock.description}</p>
                        <img
                            src={selectedBlock.image}
                            alt={selectedBlock.title}
                            className="w-3/4 h-120 mx-auto object-cover rounded-xl"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};





const data = [
    {
        icon: AcademicCapIcon,
        title: 'Learn',
        description:
            'This is a longer description. A Sed e risus, in pharetra nunc ante at magna.',
        image: 'learn.jpeg',
    },
    {
        icon: CogIcon,
        title: 'Build',
        description: 'This is a longer description, in pharetra nunc ante at magna.',
        image: 'blue.png',
    },
    {
        icon: RocketLaunchIcon,
        title: 'Deploy',
        description:
            'This is a longer description. Getrisus, in pharetra nunc ante at magna.',
        image: 'black-hole.png',
    },
    {
        icon: CurrencyDollarIcon,
        title: 'Earn',
        description:
            'This is a longer description, in pharetra nunc ante at magna.',
        image: 'blue.png',
    },
];

export default IntroInformation;



