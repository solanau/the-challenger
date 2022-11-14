import { User } from 'types/user';
import { bountiesToLevel } from 'utils';
import { getBountiesByAssignee } from './bounties';
import { getUser as getGithubUser } from 'lib/github';

const getUser = async (
    username: string,
    accessToken: string,
): Promise<User | null> => {
    const githubUser = await getGithubUser(username, accessToken);

    if (!githubUser) {
        return null;
    }

    const { avatar_url: avatarUrl, name: fullName } = githubUser;

    const bounties = await getBountiesByAssignee(username, accessToken);

    const closedBounties = bounties?.filter(({ state }) => state === 'closed');
    const closedBountiesCount = closedBounties?.length ?? 0;

    const level = bountiesToLevel(closedBountiesCount);

    return {
        avatarUrl,
        closedBountiesCount,
        fullName,
        level,
        username,
    };
};

export { getUser };
