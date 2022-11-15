import AccordionItem, { AccordionItemProps } from './accordion-item';
import { MdCode, MdLink, MdOutlineEngineering } from 'react-icons/md';

import Button from 'components/common/button';
import Text from 'components/common/text';
import { useState } from 'react';

const initialAccordionItems: Omit<AccordionItemProps, 'onExpand'>[] = [
    {
        ariaControls: 'accordion-collapse-body-1',
        children: (
            <>
                <Text variant="paragraph" className="text-base !text-secondary">
                    Anyone can participate as a Funder either by using Solana
                    Pay or transferring funds manually from their crypto wallet.
                </Text>
                <br />
                <br />
                <Text variant="paragraph" className="text-base !text-secondary">
                    Please not that Hunters are assigned to bounties{' '}
                    <span className="text-primary">manually</span> by project
                    Maintainers.
                </Text>
            </>
        ),
        dataAccordionTarget: '#accordion-collapse-body-1',
        expanded: false,
        id: 'accordion-collapse-heading-1',
        title: 'How can I participate in the Bounty Program?',
    },
    {
        ariaControls: 'accordion-collapse-body-2',
        children: (
            <div className="flex flex-col gap-3">
                <div>
                    <Text
                        variant="paragraph"
                        className="text-base !text-secondary"
                    >
                        You&apos;re{' '}
                        <span className="text-primary">not required</span> to
                        sign in with a GitHub account to simply view and fund
                        bounties. However, doing so will ensure an{' '}
                        <span className="text-primary">
                            enhanced user experience
                        </span>
                        .
                    </Text>
                    <br />
                    <br />
                    <Text
                        variant="paragraph"
                        className="text-base !text-secondary"
                    >
                        Specifically, to{' '}
                        <span className="text-primary">claim</span> bounties,
                        you must be signed in and have a wallet connected.
                    </Text>
                    <br />
                    <br />
                    <Text
                        variant="paragraph"
                        className="text-base !text-secondary"
                    >
                        To fund bounties without a wallet, please use{' '}
                        <span className="text-primary">Solana Pay</span> by
                        scanning the QR code on the bounty page.
                    </Text>
                </div>
                <a
                    href="https://solanapay.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Button
                        variant="transparent"
                        text="More info on Solana Pay"
                        icon={MdLink}
                        reversed={true}
                        className="!w-full"
                    />
                </a>
            </div>
        ),
        dataAccordionTarget: '#accordion-collapse-body-2',
        expanded: false,
        id: 'accordion-collapse-heading-2',
        title: 'Am I required to connect my GitHub account and crypto wallet?',
    },
    {
        ariaControls: 'accordion-collapse-body-3',
        children: (
            <>
                <Text variant="paragraph" className="text-base !text-secondary">
                    A{' '}
                    <span className="rounded-full bg-black/50 p-1.5 !text-xs uppercase tracking-wide text-primary">
                        Claim
                    </span>
                    -button will appear on closed bounties assigned to you,
                    after you have signed in with your GitHub account and
                    connected your crypto wallet. Maintainers can close bounties
                    they <span className="text-primary">deem finished</span>.
                </Text>
                <br />
                <br />
                <Text variant="paragraph" className="text-base !text-secondary">
                    Upon claiming a bounty, the bounty&apos;s reward is{' '}
                    <span className="text-primary">transferred directly</span>{' '}
                    to your crypto wallet.
                </Text>
                <br />
                <br />
                <Text variant="paragraph" className="text-base !text-secondary">
                    <span className="text-primary">Please note</span> that it
                    may take about{' '}
                    <span className="text-primary">15 minutes</span> for a
                    bounty to be closed on-chain after completing it.
                </Text>
            </>
        ),
        dataAccordionTarget: '#accordion-collapse-body-3',
        expanded: false,
        id: 'accordion-collapse-heading-3',
        title: 'How do I claim a bounty after completing it?',
    },
    {
        ariaControls: 'accordion-collapse-body-4',
        children: (
            <div className="flex flex-col gap-3">
                <Text variant="paragraph" className="text-base !text-secondary">
                    Both the Bounty Program front-end (this website) and the
                    back-end (the Heavy Duty Drill platform) are open-source,
                    and can can be found on{' '}
                    <span className="text-primary">GitHub</span>.
                </Text>
                <div className="flex flex-row flex-wrap gap-3">
                    <a
                        href="https://github.com/heavy-duty/platform/"
                        rel="noreferrer"
                        target="_blank"
                        className="flex-1"
                    >
                        <Button
                            variant="transparent"
                            text="Heavy Duty platform"
                            icon={MdOutlineEngineering}
                            className="!w-full"
                        />
                    </a>
                </div>
            </div>
        ),
        dataAccordionTarget: '#accordion-collapse-body-4',
        expanded: false,
        id: 'accordion-collapse-heading-4',
        title: 'How do I follow along with the development of the Bounty Program itself?',
    },
];

const Accordion = () => {
    const [accordionItems, setAccordionItems] = useState(initialAccordionItems);

    /**
     * Sets the `expanded` attribute to `true` of the selected Accordion
     * element on user click.
     *
     * @param {string} id `id` of the Accordion element to expand
     */
    const onItemExpand = (id: string) => {
        setAccordionItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, expanded: !item.expanded } : item,
            ),
        );
    };

    return (
        <div id="accordion-collapse" data-accordion="collapse">
            {accordionItems.map(accordionItemProps => (
                <AccordionItem
                    key={accordionItemProps.id}
                    onExpand={onItemExpand}
                    {...accordionItemProps}
                />
            ))}
        </div>
    );
};

export default Accordion;
