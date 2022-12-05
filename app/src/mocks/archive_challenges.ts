import { ChallengePayload } from 'types/api';

let i = 100;

export const mockChallenges: Omit<
    ChallengePayload,
    'pubkey' | 'eventPubkey' | 'eventId'
>[] = [
    //  Charity challenges
    {
        key: ++i,
        id: '221009318',
        iconKey: 0, // default
        iconSize: 35, // default
        title: 'Charity Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'A little help to a non-profit ONG based at Venezuela',
        description: `
___
### Description

Hunter, this is an special challenge. This one will unlock a charity reward to a non-profit ONG based at Venezuela.

To get you 25 points and unlock the reward you should:

- Follow Piecitos El Tigre on Twitter: <a href="https://twitter.com/piecitos_etg" target="_blank">https://twitter.com/piecitos_etg</a>
- Post a tweet with a positive message for the kids from el Tigre and tag our account <a href="https://twitter.com/piecitos_etg" target="_blank">@piecitos_etg</a>

`,
        githubUrl: 'some githubUrl',
        authorName: 'HeavyDutyBuild',
        authorGithub: 'heavy-duty/platform',
        authorTwitter: 'HeavyDutyBuild',
        rewardValue: 25,
        rewardType: 'points',
        createdAt: '2022-11-01T14:00:00',
        startDate: '2022-11-01T14:00:00',
        endDate: '2022-11-03T19:00:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Enter your Twitter handle',
                placeholder: `...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the link to your tweet mentioning @piecitos_etg',
                placeholder: `Enter your link...`,
            },
        ],
    },
    //  Mayhem League Gaming Competition
    {
        key: ++i,
        id: '221199610',
        iconKey: 0, // default
        iconSize: 35, // default
        title: 'Mayhem League Gaming Competition',
        type: 'Game',
        difficulty: 'Easy',
        shortDescription:
            'Participate and win A Trash Panda and more with Mayhem League!',
        description: `
    ___
    ### Description
    
    Find Open Dive and the Mayhem League Gaming Competition located in the HackerHouse at one of the game centers on the main floor.
    
    Battle against all hackers to be grand champion and take the prizes all for yourself.
    
    Check in with the Mayhem team to signup, ask for your code, and get ready to compete!
    
    `,
        githubUrl: 'some githubUrl',
        authorName: 'MayhemLeagueBB',
        authorGithub: '',
        authorTwitter: 'MayhemLeagueBB',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-01T14:00:00',
        startDate: '2022-11-01T14:00:00',
        endDate: '2022-11-03T16:00:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What is your signup code? ',
                placeholder: `Enter your signup code...`,
            },
        ],
    },
    // Social Twitter - Photo - Dana
    {
        key: ++i,
        id: '221004043',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Social Photo Challenge`,
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Find and Meet Dana with Solana Foundation University Relations!',
        description: `
    ___
    ### Description
    
    Time to meet others in the ecosystem! Find Dana from Solana University Relations ask some questions!
    
    Snap a photo together - and remember to smile to be eligible! It's so simple.
    
    - Tweet a photo of you and Dana on twitter!
    - Follow Dana with Solana Foundation University Relations on twitter <a href="https://twitter.com/DanaDegenius" target="_blank"> here</a> and say hi!
    - Link your tweets and stay tuned!
    `,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-01T14:00:00',
        startDate: '2022-11-01T14:00:00',
        endDate: '2022-11-03T19:00:00',
        formComponents: [
            {
                type: 'text',
                field: 'twitterHandle',
                key: 'twitterHandle',
                label: 'Enter your Twitter handle',
                placeholder: `Enter your Twitter handle...`,
            },
            {
                type: 'text',
                field: 'twitterPostLink',
                key: 'twitterPostLink',
                label: 'Enter link to your twitter post',
                placeholder: `Enter link to your twitter post...`,
            },
        ],
    },
    // Social Twitter - Photo - Colin
    {
        key: ++i,
        id: '221004042',
        iconKey: 1, // social
        iconSize: 35, // default
        title: `Social Photo Challenge`,
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Find and Meet Colin with Solana Foundation Developer Relations!',
        description: `
    ___
    ### Description
    
    Find Colin from Solana Foundation Developer Relations!
    
    Ask some questions! Snap a photo together!
    
    - Tweet a photo of you and Colin on twitter!
    - Follow Colin on Twitter <a href="https://twitter.com/c_ogoo" target="_blank"> here </a> and say hi!
    - Link your tweets and stay tuned!
    `,
        githubUrl: 'some githubUrl',
        authorName: 'HeavyDutyBuild',
        authorGithub: 'heavy-duty/platform',
        authorTwitter: 'HeavyDutyBuild',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-01T14:00:00',
        startDate: '2022-11-01T14:00:00',
        endDate: '2022-11-03T19:00:00',
        formComponents: [
            {
                type: 'text',
                field: 'twitterHandle',
                key: 'twitterHandle',
                label: 'Enter your Twitter handle',
                placeholder: `Enter your Twitter handle...`,
            },
            {
                type: 'text',
                field: 'twitterPostLink',
                key: 'twitterPostLink',
                label: 'Enter link to your twitter post',
                placeholder: `Enter link to your twitter post...`,
            },
        ],
    },
    // Social Twitter - Photo Bomb - Dana
    {
        key: ++i,
        id: '221005063',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'Social Photo Bomb Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Photo Bomb Dana from Solana Foundation University Relations!',
        description: `
___
### Description

Find and photo bomb Dana from Solana University Relations! You and friends? Appear in a photo with Dana.

- Tweet a photo of you photo-bombing Dana on twitter!
- Follow Dana, with Solana University Relations on twitter <a href="https://twitter.com/DanaDegenius" target="_blank"> here</a> and say hi!
- Link your tweets and stay tuned!

* By PHOTO Bomb we mean appear in a picture with Dana and someone else! You or someone else can still take the photo!
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-01T14:00:00',
        startDate: '2022-11-01T14:00:00',
        endDate: '2022-11-03T19:00:00',
        formComponents: [
            {
                type: 'text',
                field: 'twitterHandle',
                key: 'twitterHandle',
                label: 'Enter your Twitter handle',
                placeholder: `Enter your Twitter handle...`,
            },
            {
                type: 'text',
                field: 'twitterPostLink',
                key: 'twitterPostLink',
                label: 'Enter link to your twitter post',
                placeholder: `Enter link to your twitter post...`,
            },
        ],
    },
];
