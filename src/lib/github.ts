import { App } from 'octokit';
import { Issue, User as GithubUser, User } from 'types/github';

type IssueToCreate = {
    assignee: string;
    body: string;
    labels?: string[];
    title: string;
    points?: number;
};

interface ChallengeSubmission {
    body: string;
    title: string;
    points: number;
    challengeId: string;
}

type SearchApiResponse = {
    items: [];
};

class UserNotFoundError extends Error {
    name = 'UserNotFound';

    constructor() {
        super('User not found');
    }
}

class DuplicateChallengeSubmissionError extends Error {
    name = 'DuplicateChallengeSubmission';

    constructor() {
        super('Duplicate challenge submission');
    }
}

class LeaderboardIssueNotFoundError extends Error {
    name = 'LeaderboardIssueNotFoundError';

    constructor() {
        super('Leaderboard issue not found');
    }
}

const DRILL_BOUNTY_LABEL = 'drill:bounty';
const DRILL_BOUNTY_ENABLED_LABEL = 'drill:bounty';
const DRILL_BOUNTY_CLOSED_LABEL = 'drill:bounty:closed';
const DRILL_BOUNTY_CHALLENGE_LABEL = 'challenge';
const DRILL_BOUNTY_POINTS_LABEL = 'points:';

const authenticateGithubApp = async () => {
    const app = new App({
        appId: process.env.GITHUB_APP_ID,
        privateKey: JSON.parse(process.env.GITHUB_PRIVATE_KEY),
    });
    const octokit = await app.getInstallationOctokit(
        process.env.GITHUB_APP_INSTALLATION as unknown as number,
    );

    return octokit.rest;
};

const getDrillBountyUrlQuery = (params: string[] = []) =>
    `q=${encodeURIComponent(
        `is:issue label:"${DRILL_BOUNTY_CHALLENGE_LABEL}","${DRILL_BOUNTY_LABEL}" repo:${
            process.env.GITHUB_OWNER
        }/${process.env.GITHUB_REPO} ${params.length ? params.join(' ') : ''}`,
    )}`;

const closeIssue = async (id: number, token: string) => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues/${id}`;
    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                state: 'closed',
            }),
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
        });

        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const createIssue = async (issue: IssueToCreate, token: string) => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues`;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;
    const { body, title } = issue;

    let pointsLabel = '';

    if (issue.points) {
        pointsLabel = DRILL_BOUNTY_POINTS_LABEL + String(issue.points);
    } else {
        pointsLabel = DRILL_BOUNTY_POINTS_LABEL + '0';
    }

    try {
        const response = await fetch(url, {
            body: JSON.stringify({
                assignees: [],
                body,
                owner,
                repo,
                title,
                labels: [DRILL_BOUNTY_CHALLENGE_LABEL, pointsLabel],
            }),
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
        });
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const createChallengeSubmission = async (
    token: string,
    { body, title, points, challengeId }: ChallengeSubmission,
) => {
    const githuRestApi = await authenticateGithubApp();
    const currentUser = await getCurrentUser(token);

    if (currentUser === undefined) {
        throw new UserNotFoundError();
    }

    const issues = await githuRestApi.issues.listForRepo({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        labels: `challengeId:${challengeId},user:${currentUser.login}`,
        state: 'open',
    });

    if (issues.data.length > 0) {
        throw new DuplicateChallengeSubmissionError();
    }

    try {
        const response = await githuRestApi.issues.create({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            title: title,
            body,
            labels: [
                DRILL_BOUNTY_CHALLENGE_LABEL,
                `user:${currentUser.login}`,
                `points:${points ?? 0}`,
                `challengeId:${challengeId}`,
            ],
        });
        return response;
    } catch (error) {
        console.log('error ->', error.response.data.errors);
        throw new Error(error);
    }
};

const getGithubData = async <T>(url: string, token: string): Promise<T> => {
    try {
        const response = await fetch(
            url,
            token && { headers: { Authorization: `token ${token}` } },
        );

        if (response.status === 404) {
            return null;
        }

        if (response.status === 401) {
            console.log('Token Expired');
            return null;
        }
        return response.json();
    } catch (error) {
        throw new Error(error);
    }
};

const getIssues = async (accessToken: string): Promise<Issue[] | null> => {
    const query = getDrillBountyUrlQuery();
    let url = ``;
    let data = null;
    const per_page = 100;
    const paginated_data = [];
    const MAX_PAGES = 10;
    let i = 1;
    for (i; i < MAX_PAGES; i++) {
        url = `${process.env.GITHUB_API}/search/issues?${query}&page=${i}&per_page=${per_page}`;
        data = await getGithubData<SearchApiResponse>(url, accessToken);

        if (data === null || data.length === 0) {
            break;
        }

        const { items: issues } = data;
        paginated_data.push(...issues);
        if (data.total_count < i * per_page) {
            break;
        }
    }

    if (paginated_data.length == 0) {
        console.log(`i got nuthn for you..`);
        return null;
    }

    const issues = paginated_data;

    if (!issues.length) {
        return null;
    }
    return issues.reverse();
};

const getIssuesBySubmissionUser = async (
    username: string,
    accessToken: string,
): Promise<Issue[] | null> => {
    const query = getDrillBountyUrlQuery([`label:user:${username}`]);
    const url = `${process.env.GITHUB_API}/search/issues?${query}&per_page=100`;
    const { items: issuesByAssignee } = await getGithubData<SearchApiResponse>(
        url,
        accessToken,
    );

    if (!issuesByAssignee) {
        return null;
    }

    return issuesByAssignee.reverse();
};

const getIssue = async (
    id: number,
    accessToken: string,
): Promise<Issue | null> => {
    const url = `${process.env.GITHUB_API}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues/${id}`;
    const issue = await getGithubData<Issue>(url, accessToken);

    if (!issue) {
        return null;
    }

    return issue;
};

const getIssuesPagingUpgrade = async (
    labels: string,
): Promise<Issue[] | null> => {
    let response = null;
    const per_page = 100;
    const paginated_data = [];
    const MAX_PAGES = 10;
    let i = 1;
    const githuRestApi = await authenticateGithubApp();
    for (i; i < MAX_PAGES; i++) {
        response = await githuRestApi.issues.listForRepo({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            labels,
            page: i,
            per_page: 100,
            state: 'open',
        });

        if (response.data === null || response.data.length === 0) {
            break;
        }

        paginated_data.push(...response.data);
        if (response.data.length < i * per_page) {
            break;
        }
    }

    if (paginated_data.length == 0) {
        console.log(`i got nuthn for you..`);
        return [];
    }

    const issues = paginated_data;

    if (!issues.length) {
        return [];
    }
    return issues.reverse();
};

const getUser = async (
    username: string,
    accessToken: string,
): Promise<User | null> => {
    const url = `${process.env.GITHUB_API}/users/${username}`;
    const user = await getGithubData<GithubUser>(url, accessToken);

    if (!user) {
        return null;
    }
    return user;
};

const getCurrentUser = async (accessToken: string): Promise<User | null> => {
    const url = `${process.env.GITHUB_API}/user`;
    const user = await getGithubData<GithubUser>(url, accessToken);

    if (!user) {
        return null;
    }

    return user;
};

const createInitialLeaderboardIssue = async () => {
    const githuRestApi = await authenticateGithubApp();

    try {
        const response = await githuRestApi.issues.create({
            owner: process.env.GITHUB_OWNER,
            repo: process.env.GITHUB_REPO,
            title: 'Current Leaderboard',
            body: '[]',
            labels: [`core:leaderboard`],
        });
        return response;
    } catch (error) {
        console.log('error ->', error.response.data.errors);
        throw new Error(error);
    }
};

const getLeaderboardsIssue = async () => {
    const githuRestApi = await authenticateGithubApp();

    const issues = await githuRestApi.issues.listForRepo({
        owner: process.env.GITHUB_OWNER,
        repo: process.env.GITHUB_REPO,
        labels: `core:leaderboard`,
        state: 'open',
    });

    if (issues.data.length === 0) {
        const firstIssue = await createInitialLeaderboardIssue();

        return firstIssue.data[0];
    }
    return issues.data[0];
};

export {
    closeIssue,
    createIssue,
    createChallengeSubmission,
    getIssue,
    getIssues,
    getIssuesPagingUpgrade,
    getIssuesBySubmissionUser,
    getUser,
    getCurrentUser,
    authenticateGithubApp,
    DRILL_BOUNTY_CLOSED_LABEL,
    DRILL_BOUNTY_ENABLED_LABEL,
    DRILL_BOUNTY_CHALLENGE_LABEL,
    DRILL_BOUNTY_POINTS_LABEL,
    UserNotFoundError,
    DuplicateChallengeSubmissionError,
    getLeaderboardsIssue,
};
