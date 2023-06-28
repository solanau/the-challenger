import { AcademicCapIcon, CogIcon, CurrencyDollarIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import Text from 'components/common/text';
import { useState } from 'react';

const IntroInformation = () => {
    const [selectedBlock, setSelectedBlock] = useState({ ...data[0], index: 0 });

    const handleCardClick = (block, index) => {
        setSelectedBlock(selectedBlock?.index === index ? null : { ...block, index });
    };

    return (
        <section className="pt-40 md:pt-80 sm:my-20 grid overflow-hidden relative">
            <div className="container mx-auto mt-20 px-4 z-10">
                <Text variant="big-heading" className="text-white text-left items-center mt-20">
                    The Ultimate Education Tool for Your Events
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2 mt-10">
                    {data.map((block, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col items-center p-8 sm:p-12 cursor-pointer md:p-16 bg-gray-800 rounded-xl shadow-lg bg-gradient-to-b from-zinc-900 via-black to-black ${selectedBlock?.index === index ? 'ring-1 ring-white z-10' : ''
                                }`}
                            onClick={() => handleCardClick(block, index)}
                        >
                            <div className="h-12 w-12 mb-4 text-white">
                                <block.icon className="h-full w-full" aria-hidden="true" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">
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
                            <h2 className="text-3xl font-bold text-white mb-2">{selectedBlock.title}</h2>
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
        </section>
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



