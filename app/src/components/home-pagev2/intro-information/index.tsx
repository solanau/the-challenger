import { AcademicCapIcon, CogIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const IntroInformation = () => (
    <div className="container mx-auto py-10 px-4">
        <div className="flex space-x-4 justify-center ">
            {data.map((block, index) => (
                <div key={index} className="flex flex-col items-center p-6 w-64 bg-gray-800 rounded-lg shadow-lg bg-gradient-to-b from-zinc-900 to-black">
                    <div className="h-12 w-12 mb-4 text-white">
                        <block.icon className="h-full w-full" aria-hidden="true" />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2">{block.title}</h2>
                    <p className="text-gray-300 mb-4">{block.description}</p>
                    <img src={block.image} alt={block.title} className="w-full h-32 object-cover rounded-lg" />
                </div>
            ))}
        </div>
    </div>
)

const data = [
    {
        icon: AcademicCapIcon,
        title: 'Learn',
        description: 'This is a longer description. Absorb knowledge and gain skills. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh vitae commodo tincidunt, enim nisi condimentum risus, in pharetra nunc ante at magna.',
        image: '/path/to/your/image1.jpg'
    },
    {
        icon: CogIcon,
        title: 'Build',
        description: 'This is a longer description. Create projects and build your portfolio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh vitae commodo tincidunt, enim nisi condimentum risus, in pharetra nunc ante at magna.',
        image: '/path/to/your/image2.jpg'
    },
    {
        icon: CurrencyDollarIcon,
        title: 'Earn',
        description: 'This is a longer description. Get rewarded for your hard work. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nibh vitae commodo tincidunt, enim nisi condimentum risus, in pharetra nunc ante at magna.',
        image: '/path/to/your/image3.jpg'
    },
]

export default IntroInformation


