import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const StatItem = StatProps => (
    <div
        className={`bg-primary  ${
            StatProps.borderBottom === 'true' ? 'border-b-2' : ''
        } ${StatProps.borderRight === 'true' ? 'md:border-r-2' : ''} ${
            StatProps.removeBorderRightMedium === 'true'
                ? ' md:border-r-0 lg:border-r-2'
                : ''
        } flex
            w-full
                flex-col border-black py-5
                pl-7 md:flex-row md:items-center md:justify-center
                md:border-b-0
                md:py-0 md:pl-0`}
    >
        <span className="text-[21px] font-light  md:pr-6">
            {StatProps.bountyName}
        </span>
        <span className="text-[45px] font-medium">
            <CountUp end={StatProps.bountyNumber}>
                {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                    </VisibilitySensor>
                )}
            </CountUp>
        </span>
    </div>
);

export default StatItem;
