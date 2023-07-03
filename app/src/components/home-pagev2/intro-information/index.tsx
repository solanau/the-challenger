import { AcademicCapIcon, CogIcon, CurrencyDollarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Text from 'components/common/text';
import { useState } from 'react';

const IntroInformation = () => {
    const [selectedBlock, setSelectedBlock] = useState({ ...data[0], index: 0 });

    const handleCardClick = (block, index) => {
        setSelectedBlock(selectedBlock?.index === index ? null : { ...block, index });
    };

    return (
        <section className="grid overflow-hidden relative">
            <div className="container mx-auto px-4 z-10">
                <Text variant="big-heading" className="text-xl sm:text-xl md:text-2xl lg:text-6xl text-white text-center items-center sm:mt-20">
                    The Education Tool for Events
                </Text>

                <div className="grid grid-cols-2 gap-4 mb-2 mt-10 sm:grid-cols-2 md:grid-cols-4">
                    {data.map((block, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col items-center p-4 sm:p-8 cursor-pointer md:p-12 bg-gray-800 rounded-xl shadow-lg bg-gradient-to-b from-zinc-900 via-black to-black ${selectedBlock?.index === index ? 'ring-1 ring-white z-10' : ''}`}
                            onClick={() => handleCardClick(block, index)}
                        >
                            <div className="h-8 w-8 sm:h-10 sm:w-10 mb-2 text-white">
                                <block.icon className="h-full w-full" aria-hidden="true" />
                            </div>
                            <h2 className="text-sm font-bold text-white mb-2 lg:text-2xl">
                                {block.title}
                            </h2>
                        </div>
                    ))}
                </div>
                <div className={`transform transition-transform duration-500 ease-in-out ${selectedBlock ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    {selectedBlock && (
                        <div className="w-full md:w-3/4 mx-auto my-8 bg-gray-800 rounded-b-xl shadow-lg p-8 space-y-4 sm:space-y-6 bg-gradient-to-b from-black via-black to-black border-zinc-800 border transition-all duration-500 rounded-2xl">
                            <div className="h-12 w-12 mb-4 text-white">
                                <selectedBlock.icon className="h-full w-full" aria-hidden="true" />
                            </div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                                {selectedBlock.title}
                            </h2>
                            <p className="text-gray-300 text-3xl">{selectedBlock.description}</p>
                            <img
                                src={selectedBlock.image}
                                alt={selectedBlock.title}
                                className="w-full h-auto mx-auto mt-4 object-cover rounded-xl"
                                style={{ maxWidth: '500px', maxHeight: '500px' }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

const data = [
    {
        icon: AcademicCapIcon,
        title: 'Learn',
        description:
            'The Challenger is a tool designed to make learning fun and engaging throught challenges and rewards.',
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
