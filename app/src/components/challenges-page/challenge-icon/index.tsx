import { BiRocket, BiVideoPlus } from 'react-icons/bi';
import { FaTwitter } from 'react-icons/fa';
import { TbArrowsLeftRight } from 'react-icons/tb';
import { ChallengeCategory } from 'types/challenge';

export const getIconByCategory = (category: ChallengeCategory, sz: number) => {
    switch (category) {
        case 'Social':
            return <FaTwitter size={sz} />;
        case 'Video':
            return <BiVideoPlus size={sz} />;
        case 'Client':
            return <TbArrowsLeftRight size={sz} />;
        default:
            return <BiRocket size={sz} />; // or return null if you don't have it
    }
};
