import Button from 'components/common/button';
import Card from 'components/common/card';
import Text from 'components/common/text';
import Link from 'next/link';

const CreateChallengeSection = () => {
    return (
        <section className="pt-10 pb-20 mt-10 md:pt-10 md:pb-20 relative">
            <div className="w-full max-w-6xl px-4 py-12 mx-auto text-center">
                <Text variant="big-heading" className="text-white mb-6">
                    Create your Own Challenge
                </Text>
                <Card className="flex-grow p-8 bg-zinc-900 shadow-xl rounded-xl bg-opacity-30 border-zinc-600 border mx-auto sm:w-full md:w-10/12 lg:w-9/12 xl:w-8/12">
                    <Text variant="paragraph" className="text-gray-300 mb-6">
                        The Challenger is a project run by Solana Foundation that aims to engage and educate participants in events. It offers a competition during the events where you can compete for prizes by completing different challenges. 🏆
                    </Text>
                    <Link href="#" passHref>
                        <Button
                            text="Create your Own Challenge"
                            variant="transparent"
                            className="w-full mx-auto sm:w-auto hover:bg-gradient-to-br hover:from-purple-500 hover:to-indigo-500 bg-gradient-to-br from-indigo-500 to-fuchsia-500"
                        />
                    </Link>
                </Card>
                <div
                    className="absolute bottom-0 right-0 bg-blend-overlay hidden md:block"
                    style={{
                        backgroundImage: `url(/bottom_picture.png)`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100%",
                        maxHeight: "500px",
                        maxWidth: "250px"
                    }}
                ></div>
            </div>
        </section>
    );
};

export default CreateChallengeSection;

