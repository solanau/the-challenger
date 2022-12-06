import { AiOutlineDatabase } from 'react-icons/ai';
import { BiRocket, BiVideoPlus } from 'react-icons/bi';
import { FaGithub, FaTwitter } from 'react-icons/fa';
import { TbArrowsLeftRight } from 'react-icons/tb';

export const getIcon = (key: number, sz: number) => {
    switch (key) {
        case 1:
            return <FaTwitter size={sz} />;
        case 2:
            return <FaGithub size={sz} />;
        case 3:
            return <BiRocket size={sz} />;
        case 4:
            return <BiVideoPlus size={sz} />;
        case 5:
            return <TbArrowsLeftRight size={sz} />;
        case 6:
            return <AiOutlineDatabase size={sz} />;
        case 7:
            return <BiRocket size={sz} />;
        default:
            return <BiRocket size={sz} />; // or return null if you don't have it
    }
};
