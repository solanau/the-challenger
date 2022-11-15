

export type Bounty = {
    [x: string]: any;
    address: string;
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter?: string;
    id: number;
    mint?: string;
    name: string;
    owner: string;
    reward: number;
    state: 'open' | 'closed';
    tags: { value: string }[];
    rank: number;
};

export interface IssueLabel {
    [x: string]: any;
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: true;
    description: string;
}

export type BountyChallenge = {
    [x: string]: any;
    address: string;
    createdAt: string;
    description: string;
    githubUrl: string;
    hunter?: string;
    id: number;
    mint?: string;
    name: string;
    owner: string;
    reward: number;
    state: 'open' | 'closed';
    labels: any[];
    tags: { value: string }[];
    rank: number;
    university: string;
};

// TODO: refactor for types and collections
export type ChallengeItem = {
    [x: string]: any;
    key: number;
    id: string;
    iconKey: any;
    // icon: string;
    title: string;
    type: string;
    challengeURL: string;
    difficulty: string;
    description: string;
    githubUrl: string;
    authorName?: string;
    authorGithub?: string;
    authorTwitter?: string;
    rewardValue: number;
    rewardType: string;
    authorWebsite?: string;
    authorLogo?: string;
    sponsorALink?: string;
    sponsorALogo?: string;
    sponsorBLink?: string;
    sponsorBLogo?: string;
    mint?: string;
    name?: string;
    owner?: string;

    state?: 'open' | 'closed';
    labels?: any[];
    tags?: { value: string }[];
    rank?: number;
    createdAt?: string;
};
