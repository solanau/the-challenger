import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';

const CreateChallengeSection = () => {
    return (
        <section className="pt-10 pb-20 md:pt-20 md:pb-40">
            <div className="w-full max-w-6xl px-4 py-12 mx-auto text-center">
                <Card className="p-6 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-700 rounded-xl" style={{ backgroundColor: "zinc-900" }}>
                    <Text variant="big-heading" className="text-white mb-6">
                        Create your Own Challenge
                    </Text>
                    <Text variant="paragraph" className="text-gray-300 mb-6">
                        The Challenger is a project run by Solana Foundation that is aimed to engage and educate participants in events. This will be a competition during the events where you will be able to compete for prizes by completing the different challenges of the event! 🏆
                    </Text>
                    <Link href="#" passHref>
                        <Button
                            text="Create your Own Challenge"
                            variant="transparent"
                            className="w-full sm:w-auto mx-auto hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-500 bg-gradient-to-br from-indigo-500 to-fuchsia-500"
                            style={{ opacity: "0.9" }}
                        />
                    </Link>
                </Card>
            </div>
        </section>
    );
};

export default CreateChallengeSection;