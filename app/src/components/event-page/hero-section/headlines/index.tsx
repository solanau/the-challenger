import { Carousel } from 'react-responsive-carousel';
import Headline from './headline';
import styles from '../style/hero.module.css';

const Headlines = () => {
    const headlines = [
        {
            heading: 'Fund',
            body: 'Drive the open-source community forward by providing funding for the software you love and use on a daily-basis.',
        },
        {
            heading: 'Explore',
            body: 'Track the progress of the bounties linked to your GitHub account and find new bounties to work on.',
        },
        {
            heading: 'Grow & Earn',
            body: 'Expand your open-source portfolio by completing bounties that interest you and get paid for your work.',
        },
    ];

    return (
        <>
            <Carousel
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                infiniteLoop={true}
                className={
                    'inline w-full text-center md:hidden ' + styles.carousel
                }
            >
                {headlines.map((headline, index) => (
                    <Headline key={index} {...headline} />
                ))}
            </Carousel>

            <div className="align-center hidden justify-evenly gap-4 text-left md:flex">
                {headlines.map((headline, index) => (
                    <Headline key={index} {...headline} />
                ))}
            </div>
        </>
    );
};

export default Headlines;
