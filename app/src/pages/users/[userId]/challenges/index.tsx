import ChallengesPreviewComponent from 'components/challenges-page/challenges-preview-page';
import Text from 'components/common/text';
import { useChallenges } from 'hooks/use-challenges';
import { NextPage } from 'next';
import { useAuth } from 'providers/AuthProvider';

const ChallengesPage: NextPage = () => {
    const { user } = useAuth();
    const challenges = useChallenges({ version: 1 });

    return (
        <>
            <div className="flex w-full flex-col gap-5 bg-gradient-to-tr from-primary to-secondary p-5 sm:p-8 md:px-16 lg:px-32 lg:py-16 xl:px-48 xl:py-20">
                <Text variant="big-heading">Your Challenges</Text>
            </div>

            {user && (
                <ChallengesPreviewComponent
                    challenges={challenges.filter(
                        challenge => challenge.userId === user.id,
                    )}
                    user={user}
                    filterStartValue=""
                />
            )}
        </>
    );
};

export default ChallengesPage;
