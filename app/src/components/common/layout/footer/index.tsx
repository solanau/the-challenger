import Card from 'components/common/card';
import Image from 'components/common/image';
import Text from 'components/common/text';
import Link from 'next/link';

const Footer = () => (
    <footer className="my-16 flex flex-col justify-center gap-16 px-4 md:px-16 lg:px-32 xl:px-48">
        <div className="h-px w-full bg-line" />
        <Card className="flex w-full sm:flex-row xs:flex-col xs:justify-center xs:items-center sm:justify-between  rounded-xl p-7">
            <div className="flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
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

                <Text
                    variant="sub-heading"
                    className="font-thin !tracking-widest"
                >
                    {' '}
                    The Challenger{' '}
                </Text>
            </div>
            <div>
                <a
                    href="https://twitter.com/solanauni"
                    target="_blank"
                    rel="noreferrer"
                >
                    <Image
                        src="/solanau.png"
                        alt="SolanaU Logo "
                        width={200}
                        height={40}
                    />
                </a>
            </div>
        </Card>

        <div className="flex w-full grow flex-col items-center text-center">
            <Link href="/terms" passHref>
                <p className="... cursor-pointer underline underline-offset-1">
                    terms
                </p>
            </Link>
        </div>
    </footer>
);

export default Footer;
