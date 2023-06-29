import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';

const CreateChallengeSection = () => {
    return (
        <section className="pt-10 pb-20 mt-70 md:pt-20 md:pb-20 relative">
            <div className="w-full max-w-6xl px-4 py-12 mx-auto text-center">
                <Card className="flex-grow p-8 bg-zinc-900 shadow-xl rounded-xl bg-opacity-70 border-zinc-600 border mx-20 ">
                    <Text variant="big-heading" className="text-white mb-6">
                        Create your Own Challenges
                    </Text>
                    <Text variant="paragraph" className="text-gray-300 mb-6">
                        The Challenger is a project run by Solana Foundation that aims to engage and educate participants in events. It offers a competition during the events where you can compete for prizes by completing different challenges. 🏆
                    </Text>
                    <Link href="#" passHref>
                        <Button
                            text="Create your Own Challenge"
                            variant="transparent"
                            className="w-full sm:w-auto mx-auto hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-500 bg-gradient-to-br from-indigo-500 to-fuchsia-500"
                        />
                    </Link>
                </Card>
                <div
                    className="hidden sm:block absolute bottom-0 right-0 bg-blend-overlay"
                    style={{
                        backgroundImage: `url(/bottom_picture.png)`,
                        backgroundPosition: "right",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        width: "140%",
                        height: "120%",
                        maxHeight: 800,
                        maxWidth: 800,
                    }}
                ></div>
            </div>
        </section>
    );
};

export default CreateChallengeSection;

