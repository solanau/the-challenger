import { LeaderboardsEntry } from 'types/challenge';
import { toBounty, toBountyList } from 'utils/bounties';
import { toBountyChallengeList } from 'utils/bountyChallenge';

import { getDrillResponse } from './drill';
import {
    DRILL_BOUNTY_CHALLENGE_LABEL,
    getIssue,
    getIssues,
    getIssuesBySubmissionUser,
    getIssuesPagingUpgrade,
    getLeaderboardsIssue,
} from './github';

const getBounties = async (accessToken: string) => {
    const issues = await getIssues(accessToken);

    if (!issues) {
        return null;
    }

    return toBountyList(issues, []);
};

const getBountyChallenges = async () => {
    // const issues = await getIssues(accessToken);
    // const issues = await getIssues2();
    const issues = await getIssuesPagingUpgrade(DRILL_BOUNTY_CHALLENGE_LABEL);

    if (!issues) {
        return [];
    }

    return toBountyChallengeList(issues, []);
};

const getUsersLeaderboardFromIssue = async () => {
    const issue = await getLeaderboardsIssue();
    const { users } = JSON.parse(issue.body) as LeaderboardsEntry;
    return users;
};

const getBountiesByAssignee = async (username: string, accessToken: string) => {
    const issuesByAssignee = await getIssuesBySubmissionUser(
        username,
        accessToken,
    );
    if (!issuesByAssignee) {
        return null;
    }

    return toBountyList(issuesByAssignee, []);
};

const getBounty = async (id: number, accessToken: string) => {
    const issue = await getIssue(id, accessToken);

    if (!issue) {
        return null;
    }

    const drillResponse = await getDrillResponse(id);

    if (!drillResponse) {
        return null;
    }

    return toBounty(issue, drillResponse);
};

const getBountyReward = async (id: number) => {
    const drillResponse = await getDrillResponse(id);

    if (!drillResponse) {
        return null;
    }

    return Number(drillResponse.amount);
};

export {
    getBounty,
    getBountyReward,
    getBounties,
    getBountiesByAssignee,
    getBountyChallenges,
    getUsersLeaderboardFromIssue,
};
