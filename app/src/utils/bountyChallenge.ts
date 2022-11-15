import { getDrillResponse } from 'lib/drill';
import { Bounty, BountyChallenge } from 'types/bounty';
import { DrillResponse } from 'types/drill';
import { Issue } from 'types/github';
import { formatDate } from 'utils';

/**
 * Returns `true` if the `name` attribute of the provided Bounty matches the
 * search query.
 *
 * @param bounty Bounty to filter
 * @param rawQuery Query before unformatting
 */
const filterBounties = ({ name }: Bounty, rawQuery: string) => {
    const unformat = (str: string) => str.toLowerCase();
    const query = unformat(rawQuery);

    return unformat(name).includes(query);
};

/**
 * Returns a list of DrillResponse objects corresponding to a given list of
 * Issue objects.
 *
 * @param issues List of Issue objects
 */
const getDrillResponsesFromIssues = async (
    issues: Issue[],
): Promise<DrillResponse[]> =>
    Promise.all(issues.map(async ({ number }) => getDrillResponse(number)));

/**
 * Merges an Issue object and a DrillResponse object into a Bounty object.
 *
 * @param issue Issue object
 * @param drillResponse DrillResponse object
 */
const toBountyChallenge = (
    issue: Issue,
    drillResponse: DrillResponse,
): BountyChallenge => {
    const {
        created_at,
        body,
        html_url,
        labels,
        number,
        state,
        title,
    } = issue;
    const pointsLabel = labels.find(
        z => z.name.includes('points:'),
    );
    const points = pointsLabel ? Number(pointsLabel.name.split(':')[1]) : null;
    const teamLabel = labels.find(
        z => z.name.includes('team:'),
    );
    const team = teamLabel ? teamLabel.name.split(':')[1] : null;
    const userLabel = labels.find(
        z => z.name.includes('user:'),
    );
    const user = userLabel ? userLabel.name.split(':')[1] : null;

    const rank = 9999;

    return {
        address: drillResponse?.address?.toString() ?? null,
        createdAt: formatDate(created_at),
        description: body,
        githubUrl: html_url,
        hunter: user,
        id: number,
        mint: drillResponse?.mint?.toString() ?? null,
        name: title,
        owner: user,
        reward: points,
        state,
        labels,
        tags: labels.map(label => ({ value: label.name })),
        rank,
        university: team,
    };
};

/**
 * Merges a list of Issue objects and a list of DrillResponse objects into a
 * list of Bounty objects.
 *
 * @param issues List of Issue objects.
 * @param drillResponses List of DrillResponse objects.
 */
const toBountyChallengeList = (
    issues: Issue[],
    drillResponses: DrillResponse[],
): BountyChallenge[] =>
    issues.map((issue, i) => toBountyChallenge(issue, drillResponses[i]));

export {
    filterBounties as filterBountyChallenges,
    getDrillResponsesFromIssues,
    toBountyChallenge,
    toBountyChallengeList,
};
