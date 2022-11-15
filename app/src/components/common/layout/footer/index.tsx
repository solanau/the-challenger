import Card from 'components/common/card';
import Image from 'components/common/image';
import Text from 'components/common/text';
import Link from 'next/link';

const Footer = () => (
    <footer className="my-16 flex flex-col justify-center gap-16 px-4 md:px-16 lg:px-32 xl:px-48">
        <div className="h-px w-full bg-line" />
        <Card className="flex w-full flex-row justify-between rounded-xl px-7">
            <div className="flex sm:flex-row flex-col text-center justify-center items-center gap-3">
                <a
                    href="https://solana.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary"
                >
                    <Image
                        src="/logo-icon.svg"
                        alt="solana icon"
                        width={40}
                        height={36}
                        className="saturate-0"
                    />
                </a>
                
                <Text variant="sub-heading" className="font-thin !tracking-widest">
                    {' '}
                    Bounty Program{' '}
                </Text>
            </div>
            {/* <Text variant="label" className="font-light">
                Powered by{' '}
                <a
                    href="https://solana.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary"
                >
                    Solana
                </a>
                , Backed by{' '}
                <a
                    href="https://heavyduty.builders"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-primary"
                >
                    Heavy Duty
                </a>
            </Text> */}
            <div>
                <a href='https://heavyduty.builders/' target="_blank" rel="noreferrer">
                    <Image
                        src="/heavy.png"
                        alt="Heavy Duty Builder "
                        width={200}
                        height={150}
                    />
                </a>
            </div>
        </Card>

        <div className="flex w-full grow flex-col items-center text-center">
            <Link href="/terms" passHref>
                <p className="cursor-pointer underline underline-offset-1 ...">terms</p>
                
            </Link>
        </div>
    </footer>
);

export default Footer;
