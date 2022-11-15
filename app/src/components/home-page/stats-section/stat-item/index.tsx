import CountUp from 'react-countup';
import Text from 'components/common/text';
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
        <Text variant="label" className="md:pr-6">
            {StatProps.bountyName}
        </Text>
        <Text variant="heading">
            <CountUp end={StatProps.bountyNumber}>
                {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                    </VisibilitySensor>
                )}
            </CountUp>
        </Text>
    </div>
);

export default StatItem;
