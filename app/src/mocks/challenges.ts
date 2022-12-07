import { ChallengePayload } from '../types/api';

let i = 100;

// TODO: refactor for types, collection, interfaces etc
export const mockChallenges: Omit<
    ChallengePayload,
    'pubkey' | 'eventPubkey' | 'eventId'
>[] = [
    // Heavy Duty Social
    {
        key: ++i,
        id: '221202222',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'Social Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Have Questions? Get Support! Join the Heavy Duty Builders (we build this app)!',
        description: `
___
### Description
Hey hunter, trying to break into web3? Let's start by joining some communities where you can learn and questions!
There's many awesome communities out there, for now let's start with joining Heavy Duty Builders. We help builders break into Solana development!
- Remember: For help with the app and Solana development you can head to the Heavy Duty Builder discord!
We are the devs building the Challenger app you are using!
- Follow Heavy Duty Builders on <a href="https://twitter.com/HeavyDutyBuild" target="_blank">Twitter</a>.
- Post a tweet and tag @HeavyDutyBuild
- Join Heavy Duty Builders <a href="https://discord.gg/sbjg5YvYfM" target="_blank">Discord</a> and say hi in the '🛠general' channel
`,
        githubUrl: 'some githubUrl',
        authorName: 'HeavyDutyBuild',
        authorGithub: 'heavy-duty/platform',
        authorTwitter: 'HeavyDutyBuild',
        rewardValue: 25,
        rewardType: 'points',
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
            {
                type: 'text',
                field: 'discordName',
                key: 'discordName',
                label: 'Enter your discord username',
                placeholder: `Enter your discord username...`,
            },
            {
                type: 'text',
                field: 'hdbDiscord',
                key: 'hdbDiscord',
                label: 'Enter the link to your message in Heavy Duty Builders Discord',
                placeholder: `Enter your link...`,
            },
        ],
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
    },
    // Solana U Social
    {
        key: ++i,
        id: '2212041111',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'Social Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Get Support! Join our student and web3 builder community at Solana U.',
        description: `
___
### Description
Hey fren! Interested in accelerating your career in web3? Let's get started!
Join <a href="https://solanau.org" target="_blank">Solana U</a> to participate in project accelerators, fellowships, ambassadorships, mentorship and more!
Solana U is one of the fastest growing student, research, and builder communities in the Solana ecosystem!
- Remember: For help with the app and Solana development you can head to the Solana U discord!
- Follow Solana U on <a href="https://twitter.com/SolanaUni" target="_blank">twitter</a>.
- Post a tweet and tag @SolanaUni
- Join Solana U on <a href="https://discord.gg/solanau" target="_blank">Discord</a> and say hi in the 'main-chat'
- Let us know what your interested in building and how we can help!
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 25,
        rewardType: 'points',
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
            {
                type: 'email',
                field: 'email',
                key: 'email',
                label: 'Enter your email',
                placeholder: `username@email.com`,
            },
            {
                type: 'text',
                field: 'discordName',
                key: 'discordName',
                label: 'Enter your discord username',
                placeholder: `Enter your discord username...`,
            },
            {
                type: 'text',
                field: 'solanauDiscord',
                key: 'solanauDiscord',
                label: 'Enter the link to your message in Solana U Discord',
                placeholder: `Enter your link...`,
            },

        ],
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
    },
    // Superteam Germany Twitter
    {
        key: ++i,
        id: '2212061111',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'Social Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Follow Superteam Germany on Twitter!',
        description: `
___
### Description

Looking to join your local German chapter for web3 learning? Join SuperteamDE!

Solana developers, builders, creators, and more all from across Germany will collaborate & learn together in this space.

- Follow SuperteamDE on <a href="https://twitter.com/SuperteamDE" target="_blank">Twitter</a>.
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 25,
        rewardType: 'points',
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
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
    },
    // Superteam Germany Discord
    {
        key: ++i,
        id: '2212061112',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'Social Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription:
            'Join Superteam Germany Discord Channel!',
        description: `
___
### Description

Looking to join your local German chapter for web3 learning? Join SuperteamDE!

Solana developers, builders, creators, and more all from across Germany will collaborate & learn together in this space.

- Join SuperteamDE <a href="https://discord.gg/fkeFry26" target="_blank">Discord</a> and say and say Hallo in #intros channel!
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 25,
        rewardType: 'points',
        formComponents: [
            {
                type: 'text',
                field: 'discordName',
                key: 'discordName',
                label: 'Enter your discord username',
                placeholder: `Enter your discord username...`,
            },
            {
                type: 'text',
                field: 'discord',
                key: 'discord',
                label: 'Enter the link to your message in Discord',
                placeholder: `Enter your link...`,
            },

        ],
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
    },
    // ---------------------------------------------------------------------------
    // Social SuperteamDE Buildspace Core - Website
    {
        key: ++i,
        id: '2212061113',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'Social Challenge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription: 'Solana Developer Course by Buildspace!',
        description: `
___
### Description

Signup for Solana buildspace core:

"Introducing the world’s most comprehensive Solana program." - buildspace

- Sign up for the Solana Core free educational program at <a href="https://buildspace.so/p/solana-core" target="_blank">Solana Buildspace Core</a>!
- Join SuperteamDE <a href="https://discord.gg/fkeFry26" target="_blank">Discord</a>
- Take a screenshot of your screen after registration and post it in Superteam Germany discord #HTWBerlin channel!
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 25,
        rewardType: 'points',
        createdAt: '2022-12-07T12:30:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'discordName',
                key: 'discordName',
                label: 'Enter your discord username',
                placeholder: `Enter your discord username...`,
            },
            {
                type: 'text',
                field: 'discord',
                key: 'discord',
                label: 'Enter the link to your screenshot in Discord',
                placeholder: `Enter your link...`,
            },
        ],
    },
    // Publish a Smart Contract in Minutes
    {
        key: ++i,
        id: '221004010',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana 101: Deploy a Program',
        type: 'Deploy',
        difficulty: 'Easy',
        shortDescription:
            'Publish your first smart contract in minutes with Solana Playground!',
        description: `
___
### Description
In this challenge your mission is to deploy your first Solana program to devnet!
💡 Record the start time so we can reference it later.
How long do you think it will take you to deploy?
Good luck **Hunter**!
1. Visit the Solana developer docs: <a href="https://docs.solana.com/developers" target="_blank">https://docs.solana.com/developers</a>
2. Click on the <a href="https://docs.solana.com/getstarted/hello-world" target="_blank">Get Started</a> button
3. <a href="https://docs.solana.com/getstarted/hello-world#what-you-will-learn" target="_blank">Follow the guide to deploy a program</a>
4. <a href="https://docs.solana.com/getstarted/hello-world#deploy-your-program" target="_blank">Deploy your program and record the transaction signature</a>
5. <a href="https://docs.solana.com/getstarted/hello-world#find-your-program-id" target="_blank">Find and record your program Id</a>
💡 Record the end time. How long did it take?
NOTE: if devnet is failing, you can use testnet and show how to properly switch network.
___
### Tips
- When you click deploy you should see two buttons: Solana Explorer and Solscan. Clicking the buttons should take you to a transaction explorer where you can view details and your transaction Id in the url.
- Explorer on devnet to search for your program Id: <a href="https://explorer.solana.com/?cluster=devnet" target="_blank"> Solana Explorer</a>
- <a href="https://explorer.solana.com/tx/4v5StXx1jeuWzh9trtBQtQRMeeUjZzk7mJSq9MTx9XhDunbqY5ZpwPZQanVKfN7Tb3X1gHtMa6xgUcARVDaG7x91?cluster=devnet" target="_blank">Example transaction Id</a> is in the url followed by: /tx/.
- Id, Address, and Public Key are often used interchangeably to describe an address which can be used to look up account information.
- Example of a public key or wallet address: 6UmotVc1i6y4e6DnHf5FwYzYX9qCD7ncAbErsiu4oo3U
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://solanacookbook.com/guides/serialization.html#setting-up-for-borsh-serialization" target="_blank">Solana Cookbook: Serializing Data</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'DonnySolana',
        authorTwitter: 'DonnySolana',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Transaction Id: from your program deployment',
                placeholder: `Enter transaction Id...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Program Id',
                placeholder: `Enter program Id...`,
            },
            {
                type: 'number',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'How long did it take? (minutes)',
                placeholder: `Enter number of minutes it took to deploy your program...`,
            },
        ],
    },
    // Create a Token on Solana
    {
        key: ++i,
        id: '221004011',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Create a Token',
        type: 'SPL Token',
        difficulty: 'Easy',
        shortDescription: 'Create a Token on Solana!',
        description: `
___
### Description
Hey Hunter, did you knew that you can create tokens in Solana? In Solana we use SPL token standards and are very easy to create.
In this challenge we will work with Fungible Tokens
Let's get to it **hunter**!
💡 Record the start time so we can reference it later.
Your objective will be pretty simple, create a token and mint 21.000.000 units.
1. Visit the Solana SPL docs: <a href="https://spl.solana.com/" target="_blank">https://spl.solana.com/</a>
2. Click on <a href="https://spl.solana.com/token" target="_blank">Token Program </a>
3. <a href="https://spl.solana.com/token#reference-guide" target="_blank">Get Started:</a> Install SPL, select devnet network, create a new keypair and airdrop 1 SOL to your keypair.
4. Now you are ready to continue. <a href="https://spl.solana.com/token#example-creating-your-own-fungible-token" target="_blank">Follow the guide to create Fungible Tokens</a>
💡 Record the end time. How long did it take?
___
### Tips
- Make sure you have Rust installed!
- Check that you are currently using devnet network 👀
- Be careful when selecting your Token ID and your Associated Token Account
- Set your keypair properly!
___
### Resources
<a href="https://spl.solana.com/" target="_blank">Solana SPL</a>
<a href="https://doc.rust-lang.org/book/" target="_blank">Rust</a>
<a href="https://solscan.io/" target="_blank">SolScan Explorer</a>
<a href="https://github.com/cleon30/Solana-Bootcamp#43-fungible-tokens" target="_blank">Fungible Token Tutorial by cleon</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'cleon30',
        authorGithub: 'cleon30',
        authorTwitter: '0xCleon',
        rewardValue: 150,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'The Token ID of the Token you created',
                placeholder: `Enter Token ID...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'The Signature of your mint',
                placeholder: `Enter the signature of your mint...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'Time it took to complete the Fungible Token Challenge',
                placeholder: `Enter time...`,
            },
        ],
    },
    // ---------------------------------------------------------------------------
    // Social Twitter - Website - Realms Today - Solana Ecosystem Hub
    {
        key: ++i,
        id: '221005501',
        iconKey: 1, // social
        iconSize: 35, // default
        title: 'The Solana Ecosystem Hub',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription: 'Discover the New Solana Ecosystem Hub within Realms!',
        description: `
___
### Description
Discover and learn about the all New Solana Ecosystem Hub and the team behind it!
- Visit and explore the <a href="https://app.realms.today/discover" target="_blank">Solana Ecosystem Hub </a> within Realms website!
- Follow the Solana Ecosystem Hub on Twitter <a href="https://twitter.com/Realms_DAOs" target="_blank"> here </a>!
- Follow Emon on Twitter <a href="https://twitter.com/EmonMotamedi" target="_blank"> here </a> and give some feedback about the new ecosystem hub!
- Provide some feedback on the new ecosystem hub!
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'textArea',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What pops up when clicking on the \'+ Create Hub?\' button?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Any feedback or feature requests for the new ecosystem page?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
        ],
    },
    // more insight into Solana NFTs with Metaplex
    {
        key: ++i,
        id: '221004012',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'NFTs 101: Overview-01',
        type: 'NFT',
        difficulty: 'Easy',
        shortDescription:
            'In this challenge we gain more insight into Solana NFTs with Metaplex!',
        description: `
___
### Description
In this challenge we gain more insight into Solana NFTs with Metaplex!
Let's get into it hunter!
1. Look over the Metaplex Documentation <a href="https://docs.metaplex.com/" target="_blank">Metaplex Docs</a>.
2. Look out for the answers to the challenge questions.
3. Use the documentation provided as an additional resource!
___
### Tips
- Discover how Metaplex tools and components are used to create and manage NFTs.
___
### Resource
<a href="https://docs.metaplex.com/" target="_blank">Metaplex Docs</a>
<a href="https://docs.metaplex.com/programs/token-metadata/instructions#create-a-metadata-account" target="_blank">Create a Metadata account</a>
<a href="https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation" target="_blank">Solana Cookbook Cross Program Invocations</a>
<a href="https://solanacookbook.com/references/nfts.html#non-fungible-tokens-nfts" target="_blank">Solana Cookbook NFTs</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'kamda-cyrial',
        authorTwitter: 'CyrialK',
        rewardValue: 150,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What are NFTs?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What is Metaplex?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What is a Candy Machine?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'What is Sugar (by Metaplex)?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: 'List 4 fields of a metadata URI?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'textArea',
                field: 'sixthAnswer',
                key: 'sixthAnswer',
                label: 'What is Auction House by Metaplex?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
        ],
    },
    {
        key: ++i,
        id: '221004013',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana 101: Basics-01',
        type: 'Solana',
        difficulty: 'Easy',
        description: `
___
### Description
In this challenge we're going to test some basic Solana Blockchain knowledge: Basics-01!
Let's get into it **hunter**!
1. Preview the Solana Bytes video on <a href="https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=1" target="_blank">The Solana Programming Model</a>.
2. Look out for the answers to the challenge questions
3. Use the documentation provided as an additional resource!
___
### Tips
- Listen closely and observe the whiteboard animations.
- If you have to, rewatch the video again!
___
### Resources
<a href="https://docs.solana.com/developing/programming-model/accounts" target="_blank">Solana Developer Docs: Accounts</a>
<a href="https://solanacookbook.com/core-concepts/accounts.html#facts" target="_blank">Solana Cookbook Accounts</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        shortDescription: 'In this challenge we gain more insight into Solana!',
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'kamda-cyrial',
        authorTwitter: 'CyrialK',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'How can I find where an account is stored on-chain?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: "What change to an account's data is the only exception to the signer rules?",
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'If my program is the owner of an account, that allows my program to do what to the account?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: "If my account is a Program Derived Address (PDA), what's different about my keys?",
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // more insight into Solana NFTs with Metaplex
    {
        key: ++i,
        id: '221004014',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Unity Save Game Data',
        type: 'Game',
        difficulty: 'Easy',
        shortDescription:
            'In this challenge we gain more insight into Unity using Solana!',
        description: `
___
### Description
Lets learn how to save game data in Unity on chain using Solana!
Let's get into it hunter!
1. Preview the Solana Unity View Series <a href="https://www.youtube.com/watch?v=v1MU7uhMAdw" target="_blank">here </a>.
2. Look out for the answers to the challenge questions:
    -   How do you decode level 1 Data?
    -   What does the HelloWorldProgramPublicKey start with?
    -   What method checks the signedTransaction.Result value?
    -   Which SDKs are being used for interacting with Solana from Unity?
3. Use the github and source provided as an additional resource!
___
### Tips
- Listen closely to some of the specifics about data handling.
- If you have to, rewatch the video again!
- Checkout all the cool Unity game videos for Solana available!
___
### Resources
<a href="https://www.youtube.com/watch?v=v1MU7uhMAdw" target="_blank">How to save unity game data on chain on Solana</a>
<a href="https://github.com/Woody4618/SolanaUnityDeeplinkExample" target="_blank">Solplay Solana Unity Example</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 150,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'How do you decode level 1 Data?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What does the HelloWorldProgramPublicKey start with?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What method checks the signedTransaction.Result value?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'Which SDKs are being used for interacting with Solana from Unity?',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Learn how to use the new transaction format with Versioned Transactions.
    {
        key: ++i,
        id: '221004015',
        iconKey: 4, // video
        iconSize: 35, // default
        title: 'Versioned Transactions',
        type: 'Video',
        difficulty: 'Easy',
        shortDescription:
            'Learn how to use the new transaction format with Versioned Transactions.',
        description: `
___
### Description
In this challenge your going to learn all about Versioned Transactions!
1. Preview the Solana Bytes video on <a href="https://www.youtube.com/watch?v=8k68cMeLX2U" target="_blank">Versioned Transactions</a>
2. Look out for the answers to the challenge questions
    - How many transaction versions are supported?
    - How do you construct a MessageV0 formatted transaction?
    - What method is used to get an Address Lookup Table?
3. Use the documentation provided as an additional resource!
___
### Tips
- Learn about the latest Solana features following along with Solana Bytes.
___
### Resources
<a href="https://edge.docs.solana.com/developing/versioned-transactions" target="_blank">Versioned Transactions Docs</a>
<a href="https://edge.docs.solana.com/developing/lookup-tables#how-to-create-an-address-lookup-table" target="_blank">Address Lookup Tables</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes Youtube Video Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 150,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'How many transaction versions are supported?',
                placeholder: `Enter the number of existing versions...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'How do you construct a MessageV0 formatted transaction?',
                placeholder: `Enter the code or method...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What method is used to get an Address Lookup Table?',
                placeholder: `Enter the method name... (only the name)`,
            },
        ],
    },
    // Dive into the Solana programming model with this overview on Accounts.
    {
        key: ++i,
        id: '221004016',
        iconKey: 4, // video
        iconSize: 35, // default
        title: 'Accounts Overview',
        type: 'Video',
        difficulty: 'Easy',
        shortDescription:
            'Dive into the Solana programming model with this overview on Accounts.',
        description: `
___
### Description
In this challenge we're going to test your knowledge of Solana accounts.
Let's get into it hunter!
1. Preview the Solana Bytes video on <a href="https://www.youtube.com/watch?v=pRYs49MqapI&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=1" target="_blank">The Solana Programming Model</a>.
2. Look out for the answers to the challenge questions:
    - How can I find where an account is stored on-chain?
    - What change to an account's data is the only exception to the signer rules?
    - If my program is the owner of an account, that allows my program to do what to the account?
    - If my account is a Program Derived Address (PDA), what's different about my keys?
3. Use the documentation provided as an additional resource!
___
### Tips
- Listen closely and observe the whiteboard animations.
- If you have to, rewatch the video again!
___
### Resources
<a href="https://docs.solana.com/developing/programming-model/accounts" target="_blank">Solana Developer Docs: Accounts</a>
<a href="https://solanacookbook.com/core-concepts/accounts.html#facts" target="_blank">Solana Cookbook Accounts</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'How can I find where an account is stored on-chain?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: "What change to an account's data is the only exception to the signer rules?",
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'If my program is the owner of an account, that allows my program to do what to the account?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: "If my account is a Program Derived Address (PDA), what's different about my keys?",
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Learn more about Solana accounts and ownership.
    {
        key: ++i,
        id: '221004017',
        iconKey: 4, // video
        iconSize: 35, // default
        title: 'Accounts Ownership',
        type: 'Video',
        difficulty: 'Easy',
        shortDescription: 'Learn more about Solana accounts and ownership.',
        description: `
___
### Description
In this challenge we're going to give you another test on Solana accounts.
Good luck **hunter**!
1. Preview the Solana Bytes video on [Accounts](https://www.youtube.com/watch?v=0_j0rQ9Bvks&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=5).
2. Look out for the answers to the challenge questions.
3. Use the documentation provided as an additional resource!
___
### Tips
- Listen closely to some of the specifics about accounts & programs.
- If you have to, rewatch the video again!
___
### Resources
<a href="https://docs.solana.com/developing/programming-model/accounts" target="_blank">Solana Developer Docs: Accounts</a>
<a href="https://solanacookbook.com/core-concepts/accounts.html#facts" target="_blank">Solana Cookbook Accounts</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Which program is responsible for creating new accounts on Solana?',
                placeholder: `Enter the program's name or ID'...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Which type of accounts are marked as `Executable: true`?',
                placeholder: `Enter what these accounts are called...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'Which native Solana program holds the Program ID of 11111111111111111111111111111111?',
                placeholder: `Enter the program's name...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: "Which program(s) is allowed to change an account's data?",
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Learn about what a Cross-Program Invocation is, and how to use it.
    {
        key: ++i,
        id: '221004018',
        iconKey: 4, // video
        iconSize: 35, // default
        title: 'CPI',
        type: 'Video',
        difficulty: 'Easy',
        shortDescription:
            'Learn about what a Cross-Program Invocation is, and how to use it.',
        description: `
___
### Description
In this challenge we're going to learn all about Cross-Program Invocation (CPI).
Good luck **hunter**!
1. Preview the Solana Bytes video on [Cross-Program Invocation](https://www.youtube.com/watch?v=re1O2D_qqTA&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=6).
2. Look out for the answers to the challenge questions.
3. Use the documentation provided as an additional resource!
___
### Tips
- Listen closely to some of the specifics about what's happening.
- Pay attention to the commands used to conduct a CPI.
- If you have to, rewatch the video again!
___
### Resources
<a href="https://docs.solana.com/developing/programming-model/calling-between-programs" target="_blank">Solana Developer Docs: CPI</a>
<a href="https://solanacookbook.com/core-concepts/accounts.html#facts" target="_blank">Solana Cookbook: Accounts</a>
<a href="https://solanacookbook.com/references/programs.html#how-to-do-cross-program-invocation" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Why do we need to use Cross-Program Invocation on Solana?',
                placeholder: `Give a brief reason...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Which programs are you allowed to send a CPI to?',
                placeholder: `Is it program-specific?...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What command is used to conduct a CPI from your program?',
                placeholder: `Enter the CPI command...`,
            },
        ],
    },
    // Learn about custom account data on Solana.
    {
        key: ++i,
        id: '221004019',
        iconKey: 4, // video
        iconSize: 35, // default
        title: 'Custom Account Data',
        type: 'Video',
        difficulty: 'Easy',
        shortDescription: 'Learn about custom account data on Solana.',
        description: `
___
### Description
In this challenge you're going to learn about custom account data on Solana.
Good luck **hunter**!
1. Preview the Solana Bytes video on Custom Account Data.
<iframe width="560" height="315" src="https://www.youtube.com/embed/SCS6jt8sye0" title="Custom Account Data" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
2. Look out for the answers to the challenge questions.
3. Use the documentation provided as an additional resource!
___
### Tips
- Listen closely to some of the specifics about **serialization**.
- If you have to, rewatch the video again!
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://solanacookbook.com/guides/serialization.html#setting-up-for-borsh-serialization" target="_blank">Solana Cookbook: Serializing Data</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What library does Solana use to serialize/deserialize account data?',
                placeholder: `Enter the name of the library...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'In what form is data stored in the Solana blockchain?',
                placeholder: `Enter the data format, or acronym (hint)...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What does the size of your account determine, besides space?',
                placeholder: `Enter what the purpose of declaring size is...`,
            },
        ],
    },
    // Learn about phantom deeplinks for mobile wallets.
    {
        key: ++i,
        id: '221004020',
        iconKey: 0, // default (rocket)
        iconSize: 35, // default
        title: 'Phantom Deeplinks: 101',
        type: 'Wallet',
        difficulty: 'Easy',
        shortDescription: 'Learn about phantom deeplinks for mobile wallets.',
        description: `
___
### Description
In this challenge we're going to learn about Phantom Wallet Deep links.
Let's get to it **hunter**!
1. Read about Deeplinks here <a href="https://phantom.app/blog/introducing-phantom-deeplinks" target="_blank">Phantom Deeplinks</a>.
2. Look out for the answers to the challenge questions:
    - What do deeplinks also make it easy for users to do?
    - What is the base url that phantom uses to connect?
    - What is the payload to Sign and Send a Transaction?
    - How can users open web apps within Phantom's in-app browser, via what?
3. Use the documentation provided as an additional resource!
___
### Tips
- Discover how easy deepllinks implementation can be
- If you have to, rewatch the video again!
___
### Resources
<a href="https://docs.phantom.app/integrating/deeplinks-ios-and-android" target="_blank">Deeplinks (iOS & Android)</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What do deeplinks also make it easy for users to do?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What is the base url that phantom uses to connect?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What is the payload to Sign and Send a Transaction?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: "How can users open web apps within Phantom's in-app browser, via what?",
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Learn more about Solana PDAs. - CyrialK
    {
        key: ++i,
        id: '221004021',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: 'Writing PDAs',
        type: 'Concept',
        difficulty: 'Easy',
        shortDescription: 'Learn more about Solana PDAs.',
        description: `
___
### Description
In this challenge your mission is to create an account with a Program Derived Address (PDA).
Good luck **hunter**!
1. Preview the Solana Bytes video on [PDAs](https://www.youtube.com/watch?v=ZwFNPvqUclM&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=8).
2. Create a program capable of creating an account.
3. Create the folowing data structure for your account: one enum, then one u64.
4. Write the functionality to serialize this data on-chain. **You may hard-code the values for the data fields**.
5. Write a test to hit your program and create an account with this custom data.
6. In your test, derive the new account's public key from your program's Program ID **and the following seeds (in order)**: ["bounty", "challenge"]
___
### Tips
- Listen closely to some of the specifics about **serialization**.
- If you have to, rewatch the video again!
- You'll want to follow the steps to create an account using **CPI**.
- You'll have to add a struct that leverages Borsh to create the serializable custom data structure.
- The act of serializing this data takes place after the account has been created, and space for the data structure has been alloted.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://solanacookbook.com/core-concepts/pdas.html#facts" target="_blank">Solana Cookbook: PDAs</a>
<a href="https://github.com/solana-developers/program-examples" target="_blank">Program Examples</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'CyrialK',
        authorGithub: 'kamda-cyrial',
        authorTwitter: 'CyrialK',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: "Enter your deployed program's Program ID",
                placeholder: `Program ID...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the address of the PDA account you created with custom data',
                placeholder: `Enter link to your twitter post...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'How long did it take you to deploy this program without error?',
                placeholder: `Account Addresss...`,
            },
        ],
    },
    // Learn about Solana Staking.
    {
        key: ++i,
        id: '221004022',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: 'Solana Staking: 101',
        type: 'Staking',
        difficulty: 'Easy',
        shortDescription: 'Learn about Solana Staking.',
        description: `
___
### Description
In this challenge we're going to learn about staking on Solana.
Let's get to it **hunter**!
1. Read about Staking on Solana here: <a href="https://solana.com/staking" target="_blank">Staking</a>.
2. Look out for the answers to the challenge questions:
    - Who can stake on Solana?
    - What is Proof-of-Stake?
    - What are token holders eligible for when they choose to stake?
    - Is slashing automatic, and what causes it?
    - How often are staking rewards issued? How long is that?
    - What are two community operated tools used to view information about the network?
3. Use the documentation provided as an additional resource!
___
### Tips
- Discover how easy deepllinks implementation can be
- If you have to, rewatch the video again!
___
### Resources
<a href="https://solana.com/staking" target="_blank">Staking on Solana</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'DonnySolana',
        authorGithub: 'DonnySolana',
        authorTwitter: 'DonnySolana',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Who can stake on Solana?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What is Proof-of-Stake?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What are token holders eligible for when they choose to stake?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'Is slashing automatic, and what causes it?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: 'How often are staking rewards issued? How long is that?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'sixthAnswer',
                key: 'sixthAnswer',
                label: 'What are two community operated tools used to view information about the network?',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Help a fren out - Stack Exchange Q/A - Steve Luscher (easy)
    {
        key: ++i,
        id: '221004023',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: 'Demonstrate your Knowledge',
        type: 'Social',
        difficulty: 'Easy',
        shortDescription: 'Help a fren out on Solana Stack Exchange',
        description: `
___
### Description
In this challenge your mission is to answer a question on Solana Stack Exchange!
Let's get into it **hunter**!
1. Answer a question on <a href="https://solana.stackexchange.com/" target="_blank">Solana Stack Exchange</a>.
2. Reply with your answer
3. Get your answer approved or upvoted!
4. Upvote a good answer
5. Use the documentation provided as an additional resource!
___
### Tips
- Reference the cookbook and documentation for many answers to common questions.
___
### Resources
<a href="https://docs.solana.com" target="_blank">Solana Developer Docs</a>
<a href="https://solanacookbook.com/" target="_blank">Solana Cookbook</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'steveluscher',
        authorGithub: 'steveluscher',
        authorTwitter: 'steveluscher',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Enter the url to the question and your answer on Solana Stack Exchange',
                placeholder: `Enter url of your Q&A...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the url to the answer on Solana stack exchange you upvoted',
                placeholder: `Enter url of upvoted answer...`,
            },
        ],
    },
    // Write a Solana program to transfer SOL between two accounts! (medium)
    {
        key: ++i,
        id: '221004030',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: 'Transfer SOL',
        type: 'Deploy',
        difficulty: 'Medium',
        shortDescription:
            'Write a Solana program to transfer SOL between two accounts!',
        description: `
___
### Description
In this challenge your mission is to create a Solana program that can transfer SOL between two accounts!
💡 Record the start time so we can reference it later.
How long do you think it will take you to write this?
Good luck **hunter**!
1. Visit the [Solana Developer Docs](https://docs.solana.com/developers) or the [Solana Cookbook](https://solanacookbook.com/#contributing) for guides.
2. Write a simple HelloWorld program. You can even reference [this repository](https://docs.solana.com/getstarted/hello-world).
3. Set up a list of accounts to be passed in as a parameter.
4. Add a [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs) to conduct a transfer from one account to the other.
5. Deploy your program to \`devnet\`.
💡 Record the end time. How long did it take?
___
### Tips
- You'll need to use a **Cross-Program Invocation (CPI)** to accomplish this.
- Your sender (who's account is being debited) will need to sign this transaction.
- Your program will use three accounts: the sender, the recipient, and the System Program.
- You can use the Solana Explorer or Solscan to validate the transaction.
- You can use the CLI to validate the change in balance of two accounts.
___
### Resources
<a href="https://beta.solpg.io" target="_blank">Solana Playground</a>
<a href="https://docs.solana.com" target="_blank">Solana Developer Docs</a>
<a href="https://github.com/solana-developers/program-examples" target="_blank">Program Examples</a>
<a href="https://www.youtube.com/watch?v=hDiEv2a7VC0&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=11" target="_blank">Solana Bytes: Transfer SOL</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What is the `Program ID` from your deployed program?',
                placeholder: `Enter the program ID of your deployed program...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: "Enter the transaction ID of your program's transfer",
                placeholder: `Enter the Transaction ID...`,
            },
            {
                type: 'textArea',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: "What are the 2 public keys (addresses) used for: the sender account and the recipient? ",
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 4,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'How long did it take you to deploy without errors?',
                placeholder: `Enter the time it took you to deploy the program without errors...`,
            },
        ],
    },
    // Send a Transaction V0 using an Address Lookup Table. (medium)
    {
        key: ++i,
        id: '221004031',
        iconKey: 5, // arrows L/R
        iconSize: 35, // default
        title: 'Lookup Table',
        type: 'Client',
        difficulty: 'Medium',
        shortDescription:
            'Send a Transaction V0 using an Address Lookup Table.',
        description: `
___
### Description
In this challenge your mission is to send a Version 0 Transaction using an Address Lookup Table.
These are brand new Solana features.
How long do you think it will take you to send it?
Good luck **hunter**!
1. Visit the new [Versioned Transactions Guide](https://docs.solana.com/developers).
2. Create an Address Lookup Table.
3. Create a simple instruction, like [LookupTable](https://solana-labs.github.io/solana-web3.js/classes/SystemProgram.html#transfer).
4. Use that instruction to build a Transaction v0.
5. Successfully send that Transaction v0 over \`devnet\`.
💡 Record the end time. How long did it take?
___
### Tips
- You'll need to create an Address Lookup Tabe to reference in your transaction.
- You'll need to build a Transaction Message using components such as BlockHash. These can be obtained using the \`Connection\` object.
- The function to send a transaction (ie. \`sendAndConfirmTransaction\`) will return a signature string. You can use this string to look up your transaction on the Explorer.
- Explorer on devnet to search for your Transaction Signature (ID): [Solana Explorer](https://explorer.solana.com/?cluster=devnet)
- <a href="https://explorer.solana.com/tx/4v5StXx1jeuWzh9trtBQtQRMeeUjZzk7mJSq9MTx9XhDunbqY5ZpwPZQanVKfN7Tb3X1gHtMa6xgUcARVDaG7x91?cluster=devnet" target="_blank">Example transaction Id</a> is in the url followed by: /tx/.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://github.com/solana-developers/web3-examples" target="_blank">Web3 Examples</a>
<a href="https://www.youtube.com/watch?v=8k68cMeLX2U&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=12" target="_blank">Solana Bytes: Transaction v0</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Enter your Transaction ID of the transaction you ran',
                placeholder: `Transaction ID...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the address of your Lookup Table you created',
                placeholder: `Lookup Table Address...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'How long did it take you to run the transaction without errors?',
                placeholder: `Enter the time it took you to run the transaction...`,
            },
        ],
    },
    // Write custom data to the Solana blockchain. (medium)
    {
        key: ++i,
        id: '221004032',
        iconKey: 0, // arrows L/R
        iconSize: 35, // default
        title: 'Writing Custom Data',
        type: 'Deploy',
        difficulty: 'Medium',
        shortDescription: 'Write custom data to the Solana blockchain.',
        description: `
___
### Description
In this challenge your mission is to create a program that can write custom data to an account.
Good luck **hunter**!
1. Preview the Solana Bytes video on [Custom Account Data](https://www.youtube.com/watch?v=SCS6jt8sye0&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=7).
2. Create a program capable of creating an account.
3. Create the folowing data structure for your account: one string, then one u8.
4. Write the functionality to serialize this data on-chain. **You may hard-code the values for the data fields**.
5. Write a test to hit your program and create an account with this custom data.
___
### Tips
- Listen closely to some of the specifics about **serialization**.
- If you have to, rewatch the video again!
- You'll want to follow the steps to create an account using **CPI**.
- You'll have to add a struct that leverages Borsh to create the serializable custom data structure.
- The act of serializing this data takes place after the account has been created, and space for the data structure has been alloted.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://solanacookbook.com/guides/serialization.html#setting-up-for-borsh-serialization" target="_blank">Solana Cookbook: Serializing Data</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: "Enter your deployed program's Program ID",
                placeholder: `Program ID...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the transaction ID of the transaction that created the account',
                placeholder: `Transaction ID...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'Enter the address of the account you created with custom data',
                placeholder: `Account Addresss...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'How long did it take you to deploy this program without error?',
                placeholder: `Enter how long it took you...`,
            },
        ],
    },
    //  Create a Solana account with a Program Derived Address using your program. (medium)
    {
        key: ++i,
        id: '221004033',
        iconKey: 0, // arrows L/R
        iconSize: 35, // default
        title: 'Writing PDAs',
        type: 'Deploy',
        difficulty: 'Medium',
        shortDescription:
            'Create a Solana account with a Program Derived Address using your program.',
        description: `
___
### Description
In this challenge your mission is to create an account with a Program Derived Address (PDA).
Good luck **hunter**!
1. Preview the Solana Bytes video on [PDAs](https://www.youtube.com/watch?v=ZwFNPvqUclM&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=8).
2. Create a program capable of creating an account.
3. Create the folowing data structure for your account: one enum, then one u64.
4. Write the functionality to serialize this data on-chain. **You may hard-code the values for the data fields**.
5. Write a test to hit your program and create an account with this custom data.
6. In your test, derive the new account's public key from your program's Program ID **and the following seeds (in order)**: ["bounty", "challenge"]
___
### Tips
- Listen closely to some of the specifics about **serialization**.
- If you have to, rewatch the video again!
- You'll want to follow the steps to create an account using **CPI**.
- You'll have to add a struct that leverages Borsh to create the serializable custom data structure.
- The act of serializing this data takes place after the account has been created, and space for the data structure has been alloted.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://solanacookbook.com/core-concepts/pdas.html#facts" target="_blank">Solana Cookbook: PDAs</a>
<a href="https://github.com/solana-developers/program-examples" target="_blank">Program Examples</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: "Enter your deployed program's Program ID",
                placeholder: `Program ID...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the transaction ID of the transaction that created the account',
                placeholder: `Transaction ID...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'Enter the address of the PDA account you created with custom data',
                placeholder: `Account Addresss...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'How long did it take you to deploy this program without error?',
                placeholder: `Enter how long it took you...`,
            },
        ],
    },
    //  Write a custom Solana program that can create a new Token Mint with a PDA as the Mint Authority. (medium)
    {
        key: ++i,
        id: '221004034',
        iconKey: 0, // arrows L/R
        iconSize: 35, // default
        title: 'PDA Mint Authority',
        type: 'Deploy',
        difficulty: 'Medium',
        shortDescription:
            'Write a custom Solana program that can create a new Token Mint with a PDA as the Mint Authority.',
        description: `
___
### Description
In this challenge your mission is to create a Solana program that can create a new Token Mint where the Mint Authority is a PDA!
💡 Record the start time so we can reference it later.
How long do you think it will take you to write this?
Good luck **hunter**!
1. Visit the [Solana Developer Docs](https://docs.solana.com/developers) or the [Solana Cookbook](https://solanacookbook.com/#contributing) for guides.
2. Write a simple HelloWorld program. You can even reference [this repository](https://docs.solana.com/getstarted/hello-world).
3. Set up a list of accounts to be passed in as a parameter.
4. Add a [Cross-Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs) to conduct a transfer from one account to the other.
5. Deploy your program to \`devnet\`.
💡 Record the end time. How long did it take?
___
### Tips
- You'll need to use a **Cross-Program Invocation (CPI)** to accomplish this.
- Your sender (who's account is being debited) will need to sign this transaction.
- Your program will use three accounts: the sender, the recipient, and the System Program.
- You can use the Solana Explorer or Solscan to validate the transaction.
- You can use the CLI to validate the change in balance of two accounts.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://spl.solana.com/token" target="_blank">SPL Token Docs</a>
<a href="https://github.com/solana-developers/program-examples" target="_blank">Program Examples</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'The Program ID from your deployed program',
                placeholder: `Enter the program ID of your deployed program...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'The transaction ID of your &quot;create mint&quot; transaction',
                placeholder: `Enter the transaction ID of your program's transferk...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'The address of your newly created mint',
                placeholder: `Enter the transaction ID of your program's transfer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'The seeds used to create your PDA',
                placeholder: `Enter the transaction ID of your program's transfer...`,
            },
            {
                type: 'text',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: 'How long did it take you to deploy without errors?',
                placeholder: `Enter the time it took you to deploy the program without errors...`,
            },
        ],
    },
    //  Build a unique application using Helius Webhooks. (medium)
    {
        key: ++i,
        id: '221004035',
        iconKey: 0, // default
        iconSize: 35, // default
        title: 'Helius Webhooks',
        type: 'SDK',
        difficulty: 'medium',
        shortDescription: 'Build a unique webhook with Helius!',
        description: `
___
### Description
In this challenge your mission is to setup a webhook using Helius API!
After following along in the tutorial, it is up to you to make a unique implementation using a webhook that is not directly from the tutorial.
"Helius, we enable builders to create rich crypto experiences, fast." - Helius
<a href="https://docs.helius.xyz/introduction/why-helius-api#what-is-helius-api" target="_blank">Learn about Helius</a>
Good luck **hunter**!
1. Complete the <a href="https://docs.helius.xyz/webhooks/webhooks-tutorial" target="_blank">Helius webhooks tutorial</a>.
2. Create a webhook with Helius.
3. Submit your entry!
___
### Tips
- "Helius, we enable builders to create rich crypto experiences, fast." - Helius <a href="https://docs.helius.xyz/introduction/why-helius-api#what-is-helius-api" target="_blank">Learn about Helius</a>
- Webhooks let you listen to on-chain events and trigger certain actions when these events happen.
- Discover how webhooks and apis are useful!
- Remember to use the docs, solana stack exchange, the events team, and Solana U for help and questions!
___
### Resources
<a href="https://docs.helius.xyz" target="_blank">Helius Docs</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'starry',
        authorGithub: 'jstarry',
        authorTwitter: 'jstrry',
        rewardValue: 500,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'A link to your Helius Webhook implementation code in github, replit or similar',
                placeholder: `Enter the link to your code...`,
            },
            {
                type: 'textArea',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What unique functionality different from the tutorial does your webhook implement?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 4,
            },
            {
                type: 'textArea',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What is your webhook ID and webhook URL',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 4,
            },
            {
                type: 'textArea',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'What feedback do you have for Helius and your experience using a webhook?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 4,
            },
        ],
    },
    //  Build custom instruction processing for your Solana program. (hard)
    {
        key: ++i,
        id: '221004036',
        iconKey: 0, // default
        iconSize: 35, // default
        title: 'Processing Instructions',
        type: 'Deploy',
        difficulty: 'Hard',
        shortDescription:
            'Build custom instruction processing for your Solana program.',
        description: `
___
### Description
In this challenge your mission is to build a Solana program with two types of instructions.
This program will be written in native Solana (not Anchor).
This program will be able to conduct the following two instructions:
1. Create a counter PDA. This PDA account should have one field: value: \`u8\`.
2. Increment that counter PDA's value by 1.
Good luck **hunter**!
1. Preview the Solana Bytes video on [Processing Instructions](https://www.youtube.com/watch?v=T5p8rGD0-vs&list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm&index=10).
2. Create a program capable of creating an account.
3. Create the folowing data structure for your account: one field named "value" of type \`u8\`.
4. Write the functionality to serialize this data on-chain.
5. Now add the second function for incrementing the value.
6. Write a custom instruction data structure to determine which function is to be run when your program is invoked.
7. Now write a test. Replicate the instruction data on your client side.
5. Add to your test the functionality to hit your program with both instructions, one after another.
___
### Tips
- You'll want to follow the steps to create an account using **CPI**.
- You'll have to add a struct that leverages Borsh to create the serializable custom data structure.
- The act of serializing this data takes place after the account has been created, and space for the data structure has been alloted.
- You'll need to derive the PDA on the client-side, but on your program-side you want to make sure your program is the owner of the new account.
- You'll want to use a struct for Instruction Data as well as the Data for your account.
- It helps tremendously to have an InstructionType enum as the first field of your Instruction Data.
- You may want to leverage a \`match\` statement in your \`processor.rs\` file to direct flow of your program.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
<a href="https://github.com/solana-developers/program-examples" target="_blank">Program Examples</a>
<a href="https://www.youtube.com/playlist?list=PLilwLeBwGuK51Ji870apdb88dnBr1Xqhm" target="_blank">Solana Bytes YouTube Playlist</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'realbuffalojoe',
        authorGithub: 'realbuffalojoe',
        authorTwitter: 'realbuffalojoe',
        rewardValue: 500,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: "Enter your deployed program's Program ID",
                placeholder: `Program ID...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Enter the transaction ID of the transaction that created the account',
                placeholder: `Transaction ID...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: "Enter the transaction ID of the transaction that incremented the account's value",
                placeholder: `Transaction ID...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'Enter the address of the PDA account you created with custom data',
                placeholder: `Account Addresss...`,
            },
            {
                type: 'text',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: 'How long did it take you to deploy this program without error?',
                placeholder: `Enter how long it took you...`,
            },
        ],
    },
    //     //  Build a unique application using Orca SDK. (hard)
    //     {
    //         key: ++i,
    //         id: '221004037',
    //         iconKey: 0, // default
    //         iconSize: 35, // default
    //         title: 'Orca SDK Challenge',
    //         type: 'SDK',
    //         difficulty: 'Hard',
    //         shortDescription: 'Build a unique application using Orca SDK!',
    //         description: `
    // ___
    // ### Description

    // In this challenge your mission is to build a unique implementation using the ORCA SDK!

    // Implement functionality or features that include swaps, pools, or the whirlpool SDK!

    // *Note: The Common SDK and utility functions do not count for completion.

    // "Orca is the easiest, fastest, and most user-friendly cryptocurrency exchange on the Solana blockchain." - Orca

    // Good luck **hunter**!

    // 1. Review the Orca Github, SDKs, and Docs [Orca Docs](https://docs.orca.so/orca-for-builders/orca-developer-portal).
    // 2. What are whirlpools?
    // 3. Create an application capable of interacting with or utilizing the Orca SDK.
    // 4. Submit your unique entry!

    // * Submission must demonstrate unique functionality or integration not mirroring the examples
    // * Code will be reviewed for quality and uniqueness
    // * Code should run succesfully with an intended outcome
    // ___
    // ### Tips

    // - Good luck!

    // ___
    // ### Resources

    // <a href="https://github.com/orca-so" target="_blank">Orca Github</a>

    // <a href="https://github.com/orca-so/typescript-sdk" target="_blank">Orca Typescript SDK</a>

    // <a href="https://www.orca.so/" target="_blank">Orca</a>
    // `,
    //         githubUrl: 'some githubUrl',
    //         authorName: 'donnysolana',
    //         authorGithub: 'donnysolana',
    //         authorTwitter: 'donnysolana',
    //         rewardValue: 1000,
    //         rewardType: 'points',
    //         createdAt: '2022-11-17T14:00:00',
    //         startDate: '2022-12-07T12:30:00',
    //         endDate: '2022-12-07T03:30:00',
    //         formComponents: [
    //             {
    //                 type: 'text',
    //                 field: 'firstAnswer',
    //                 key: 'firstAnswer',
    //                 label: 'A link to your github SDK implementation',
    //                 placeholder: `Enter the link to your github SDK implementation...`,
    //             },
    //             {
    //                 type: 'text',
    //                 field: 'secondAnswer',
    //                 key: 'secondAnswer',
    //                 label: 'Were you able to publish a demo?',
    //                 placeholder: `Enter your link...`,
    //             },
    //             {
    //                 type: 'textarea',
    //                 field: 'thirdAnswer',
    //                 key: 'thirdAnswer',
    //                 label: 'Enter 1 or more transaction ids from running your implementation',
    //                 placeholder: `Enter your transaction ids...`,
    //                 maxLength: 200,
    //                 rows: 3,
    //             },
    //             {
    //                 type: 'textarea',
    //                 field: 'fourthAnswer',
    //                 key: 'fourthAnswer',
    //                 label: 'Describe your implementation and why you chose it',
    //                 placeholder: `Enter your answer...`,
    //                 maxLength: 200,
    //                 rows: 4,
    //             },
    //         ],
    //     },
    //     //  Build a unique application using Jupiter SDK. (hard)
    //     {
    //         key: ++i,
    //         id: '221004038',
    //         iconKey: 0, // default
    //         iconSize: 35, // default
    //         title: 'Jupiter SDK Challenge',
    //         type: 'SDK',
    //         difficulty: 'Hard',
    //         shortDescription: 'Build a unique application using Jupiter SDK!',
    //         description: `
    // ___
    // ### Description

    // In this challenge your mission is to build a unique implementation using the Jupiter SDK!

    // Jupiter is the key liquidity aggregator for Solana, offering the widest range of tokens and best route discovery between any token pair.

    // #### Why Jupiter?

    // Integrate with Jupiter in order to:

    // - Offer best price swaps for your users
    // - Automatically stay up to date with the latest tokens and liquidity sources
    // - Make swaps a revenue source by adding your own platform fee to the transaction
    // - Set caching options to make your swap as speedy or as precise you wish.

    // Good luck **hunter**!

    // 1. Review the Jupiter SDK and Docs [Jupiter Docs](https://docs.jup.ag/).
    // 2. Create an application capable of interacting with or utilizing the Jupiter SDK.
    // 3. Submit your unique entry!

    // *Submission must demonstrate unique functionality or integration not mirroring the examples

    // ___
    // ### Tips

    // - Good luck!

    // ___
    // ### Resources

    // <a href="https://docs.jup.ag/" target="_blank">Jupiter Docs</a>

    // <a href="https://docs.jup.ag/how-does-jupiter-work" target="_blank">How Jupiter Works</a>

    // <a href="https://docs.jup.ag/jupiter-api/examples" target="_blank">Jupiter Examples</a>

    // <a href="https://github.com/jup-ag/" target="_blank">Jupiter Github</a>
    // `,
    //         githubUrl: 'some githubUrl',
    //         authorName: 'starry',
    //         authorGithub: 'jstarry',
    //         authorTwitter: 'jstrry',
    //         rewardValue: 1000,
    //         rewardType: 'points',
    //         nftBadge: true,
    //         createdAt: '2022-11-17T14:00:00',
    //         startDate: '2022-12-07T12:30:00',
    //         endDate: '2022-12-07T03:30:00',
    //         formComponents: [
    //             {
    //                 type: 'text',
    //                 field: 'firstAnswer',
    //                 key: 'firstAnswer',
    //                 label: 'A link to your github Jupiter SDK implementation',
    //                 placeholder: `Enter the link to your github SDK implementation...`,
    //             },
    //             {
    //                 type: 'text',
    //                 field: 'secondAnswer',
    //                 key: 'secondAnswer',
    //                 label: 'Were you able to publish a demo?',
    //                 placeholder: `Enter your link...`,
    //             },
    //         ],
    //     },
    // Play with Fractal!
    {
        key: ++i,
        id: '221004039',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Unity Save Game Data',
        type: 'Game',
        difficulty: 'Easy',
        shortDescription: 'Play with Fractal!',
        description: `
___
### Description
Lets learn how to save game data in Unity on chain using Solana!
Let's get into it hunter!
1. Create a fractal account and try at least one of the Solana games.
 <a href="https://www.fractal.is/" target="_blank">fractal </a>.
- Thats it! Have fun and answer the questions!
___
### Tips
- Fun with fractal
___
### Resources
<a href="https://www.fractal.is/" target="_blank">fractal</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'textArea',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Name 4 Solana games and their genre. ',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 4,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Paste the wallet address that fractal created for you. ',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Learn concepts of ev.io on fractal!
    {
        key: ++i,
        id: '221004040',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Unity Save Game Data',
        type: 'Game',
        difficulty: 'Easy',
        shortDescription: 'Learn concepts of ev.io on fractal!',
        description: `
___
### Description
Lets learn how to save game data in Unity on chain using Solana!
Let's get into it hunter!
1. Play a round of ev.io and try to find out how their play to earn concept works.
 <a href="https://www.fractal.is/ev/play-now" target="_blank">here </a>.
2. Look out for the answers to the challenge questions:
___
### Tips
- Try to have some fun!
___
### Resources
<a href="https://www.fractal.is/ev/play-now" target="_blank">ev.io on fractal</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'How does the play to earn concept in ev.io work?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'How can they give out money without the game costing anything to play?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'Do you think it is a ponzi scheme or a sustainable business model?',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Metaplex NFT Standard and tools
    {
        key: ++i,
        id: '221004041',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Metaplex NFT Standard and tools',
        type: 'NFT',
        difficulty: 'Easy',
        shortDescription: 'Metaplex NFT Standard and tools',
        description: `
___
### Description
Lets learn more about the NFT standard Metaplex!
Let's get into it hunter!
1. Read through the documentation on how an NFT is setup.
<a href="https://docs.metaplex.com/programs/token-metadata/overview " target="_blank">Metaplex Overview </a>.
___
### Tips
- What are NFTs really?
___
### Resources
<a href="https://docs.metaplex.com/programs/token-metadata/overview" target="_blank">Metaplex Overview</a>
<a href="https://explorer.solana.com/" target="_blank">Solana Explorer</a>
<a href="https://solscan.io/" target="_blank">Solscan</a>
<a href="https://cryptostraps.tools/mint-nft" target="_blank">Cryptostraps</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What is the maximum supply of an NFT mint account?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What is a mint authority?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What means Non-Fungible in NFT?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'Using Solana Explorer find and post the Picture URL of this NFT: Yy4cRxJytgGf4VneXXkHLyYrP9jKjWXiXGokVZaiYK4',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: 'Using Solscan find and post the Picture URL of this NFT: Yy4cRxJytgGf4VneXXkHLyYrP9jKjWXiXGokVZaiYK4',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'sixthAnswer',
                key: 'sixthAnswer',
                label: 'Mint an NFT with your own picture https://cryptostraps.tools/mint-nft and paste the nft address. ',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Create your own Unity Game on Solana referencing a tutorial
    {
        key: ++i,
        id: '221004042',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Unity Save Game Data',
        type: 'Game',
        difficulty: 'Medium',
        shortDescription:
            'Create your own Unity Game on Solana referencing a tutorial!',
        description: `
___
### Description
Create your own Unity game on Solana!
Let's get to it hunter!
1. Follow this Unity:  <a href="https://www.youtube.com/watch?v=mS5Fx_yzcHw&ab_channel=SolPlay" target="_blank">tutorial </a>.
2. Look out for the answers to the challenge questions
3. Use the github source provided as an additional resource!
___
### Tips
- Listen closely to some of the specifics about data handling.
- If you have to, rewatch the video again!
- Checkout all the cool Unity game videos for Solana available!
___
### Resources
<a href="https://github.com/Woody4618/SolanaUnityDeeplinkExample" target="_blank">Solana Unity DeepLinks Example</a>
<a href="https://www.youtube.com/watch?v=mS5Fx_yzcHw&ab_channel=SolPlay" target="_blank">SolPlay game channel</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 500,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Setup the unity project and mint an NFT on dev net',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What kind of NFT did you mint?',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Learn about raindrops and boots!
    {
        key: ++i,
        id: '221004043',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Unity Save Game Data',
        type: 'Game',
        difficulty: 'Easy',
        shortDescription: 'Learn about raindrops and boots!',
        description: `
___
### Description
Lets learn about Raindrops and what it can make possible for game development!
Let's get into it hunter!
1. Raindrops is a very interesting project that may become very valuable for game development. Make yourself familiar with the
 <a href="https://docs.raindrops.xyz/" target="_blank">Raindrops Documentation </a>.
2. Look out for the answers to the challenge questions and learn about "Boots"
3. Use the github and source provided as an additional resource!
___
### Tips
- Learn about Randrops and Boots
___
### Resources
<a href="https://docs.raindrops.xyz/" target="_blank">Raindrops</a>
<a href="https://docs.raindrops.xyz/boots" target="_blank">Boots Docs</a>
<a href="https://twitter.com/MagicEden/status/1581773064378863617" target="_blank">Boots Hint</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'Woody4618',
        authorGithub: 'Woody4618',
        authorTwitter: 'SolPlay_jonas',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'textArea',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What are the 5 Contracts that Raindrops provides? ',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 4,
            },
            {
                type: 'text',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What functionality does “boots” provide and how could it be used in games?',
                placeholder: `Enter your answer...`,
            },
            {
                type: 'text',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'How could Raindrops potentially solve the NFT Royalties problem in Solana NFTs?',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Install Solana.Unity SDK and mint a unique NFT badge of completion in Unity!
    {
        key: ++i,
        id: '221004044',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Unity Save Game Data',
        type: 'Game',
        difficulty: 'Easy',
        shortDescription:
            'Install Solana.Unity SDK and mint a unique NFT badge of completion in Unity!',
        description: `
___
### Description
Lets learn about installing Unity and the Solana Unity SDK and mint an NFT!
Let's get into it hunter!
To complete this challenge you will need to:
1. Download and Install <a href="https://unity3d.com/get-unity/download" target="_blank">Unity</a>.
2. Install the Solana.Unity-SDK following the <a href="https://github.com/garbles-labs/Solana.Unity-SDK#installation" target="_blank">instructions</a>
3. Use the <a href="https://github.com/garbles-labs/Solana.Unity-SDK/blob/cd183da4fa3b98015cb427c94193d2c72b8a5ef9/Runtime/codebase/nft/CandyMachineV2.cs#L738" target="_blank">MintOneToken</a>
method to mint a unique Solana.Unity SDK NFT badge from a <a href="https://docs.metaplex.com/programs/candy-machine/" target="_blank">Candy Machine</a>,
with address: <a href="https://explorer.solana.com/address/GwqoCzUo7f2pUgmYZafWYryzFdUGGwER4EJtdGPfrFWg?cluster=devnet" target="_blank">GwqoCzUo7f2pUgmYZafWYryzFdUGGwER4EJtdGPfrFWg</a>
4. Post the address of the minted NFT below and in the discussion!
5. Star the <a href="https://github.com/garbles-labs/Solana.Unity-SDK" target="_blank">Solana.Unity-SDK</a>
Happy minting 🎈
___
### Tips
- Learn about Installing Unity and Solana Unity SDK,
___
### Resources
<a href="https://github.com/garbles-labs/Solana.Unity-SDK" target="_blank">Solana.Unity-SDK</a>
<a href="https://unity3d.com/get-unity/download" target="_blank">Unity</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'PiccoGabriele',
        authorGithub: 'Solana.Unity-SDK',
        authorTwitter: 'PiccoGabriele',
        rewardValue: 200,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Post the address of the minted NFT!',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Create an SSO login using Solana Unity SDK using Web3Auth SDK Challenge!
    {
        key: ++i,
        id: '221004045',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Unity Wallet Web3Auth SDK Challenge!',
        type: 'Game',
        difficulty: 'Medium',
        shortDescription:
            'Create an SSO login using Solana Unity SDK and Web3Auth SDK Challenge!',
        description: `
___
### Description
Lets learn about web3auth using the Solana Unity SDK!
Let's get into it hunter!
<a href="https://www.youtube.com/watch?v=v1MU7uhMAdw" target="_blank">Solana.Unity-SDK</a> supports <a href="https://web3auth.io/" target="_blank">Web3Auth</a> authentication with Web3Auth (non custodial wallet/signature) trough different Web2 provides (Google, Twitter, ...). In this challenge you will add an option to Login with Reddit.
To complete this challenge you will need to:
Download and Install Unity
Install the Solana.Unity-SDK following the instructions and import the example
Modify the example wallet scene to add Reddit login option
Use the airdrop function to request 1 SOL on the account created with Reddit login
Post the address of the address in the discussion and don't forget to ⭐ the repo
1. Download and Install <a href="https://unity3d.com/get-unity/download" target="_blank">Unity</a>.
2. Install the Solana.Unity-SDK following the <a href="https://github.com/garbles-labs/Solana.Unity-SDK#installation target="_blank">instructions</a> and import the example
3. Modify the example wallet scene to add Reddit login option
4. Use the airdrop function to request 1 SOL on the account created with Reddit login
4. Post the wallet address below and in the discussion!
5. Star the <a href="https://github.com/garbles-labs/Solana.Unity-SDK" target="_blank">Solana.Unity-SDK</a>
___
### Tips
- Listen closely to some of the specifics about data handling.
Happy login 🎈
___
### Resources
<a href="https://github.com/garbles-labs/Solana.Unity-SDK" target="_blank">Solana.Unity-SDK</a>
<a href="https://unity3d.com/get-unity/download" target="_blank">Unity</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'PiccoGabriele',
        authorGithub: 'Solana.Unity-SDK',
        authorTwitter: 'PiccoGabriele',
        rewardValue: 350,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Post the address of the new wallet',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    // Solan Unity SDK and WebGL basics!
    {
        key: ++i,
        id: '221004046',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Unity SDK 101-1 webgl',
        type: 'Game',
        difficulty: 'Medium',
        shortDescription: 'Solana Unity SDK and WebGL basics!',
        description: `
___
### Description
Solana.Unity SDK is fully compatible with WebGL. In this challenge you will compile the Solana.Unity-SDK <a href="https://garbles-labs.github.io/Solana.Unity-SDK/" target="_blank">Unity</a>demo scene and publish it using <a href="https://pages.github.com/" target="_blank">Unity</a>Github pages
Let's get into it hunter!
To complete this challenge you will need to:
1. Download and Install <a href="https://unity3d.com/get-unity/download" target="_blank">Unity</a>.
2. Install the Solana.Unity-SDK following the <a href="https://github.com/garbles-labs/Solana.Unity-SDK#installation" target="_blank">instructions</a>
3. Modify the example wallet scene changing the main title to Singapore Hacker House
4. Compile the scene to WebGL (be sure to <a href="https://www.youtube.com/watch?v=2jjESP58jsA" target="_blank">disable compression</a>)
5. Host the demo on Github pages
___
### Tips
- Learn about Installing Unity and Solana Unity SDK,
___
### Resources
<a href="https://github.com/garbles-labs/Solana.Unity-SDK" target="_blank">Solana.Unity-SDK</a>
<a href="https://unity3d.com/get-unity/download" target="_blank">Unity</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'PiccoGabriele',
        authorGithub: 'Solana.Unity-SDK',
        authorTwitter: 'PiccoGabriele',
        rewardValue: 300,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'text',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'Post the github pages url after you host the demo!',
                placeholder: `Enter your answer...`,
            },
        ],
    },
    //     // more insight into Solana NFTs with Metaplex
    //     {
    //         key: ++i,
    //         id: '221004047',
    //         iconKey: 0, // rocket
    //         iconSize: 35, // default
    //         title: 'Friktion SDK Challenge 1!',
    //         type: 'SDK',
    //         difficulty: 'Hard',
    //         shortDescription: 'Build a unique application using Friktion SDK!',
    //         description: `
    // ___
    // ### Description

    // In this challenge your mission is to build a unique implementation using the Friktion SDK!

    // Friktion is Solana’s premier full-stack portfolio management solution. Friktion’s Volts are risk-adjusted return strategies for DAOs, individuals, and traditional institutions. Anyone can build a UI over existing volts, allowing crypto users to invest their assets!

    // ___

    // ### Why Friktion?

    // Integrate with Friktion to:

    // - Build a UI over existing volts, allowing crypto users to invest their assets
    // - Create your own volts and manage the rebalancing process
    // - Deposit or withdraw programmatically to DCA into a volt
    // - Track historical strategy performance

    // ### Tips

    // - For 1-on-1 direct support please join the #developers channel in our discord:
    // <a href="https://discord.gg/friktion" target="_blank">https://discord.gg/friktion</a>
    // - Please go through the deposit flow (you can use dust amounts of crypto, i can also send you some, just telegram me your wallet address!)
    // - Does anything confuse you? Telegram me any time: <a href="http://telegram.me/jasonchitla" target="_blank">@jasonchitla</a>

    // ___
    // ### Resources

    // <a href="https://docs.friktion.fi/integration/overview" target="_blank">Friktion SDK Docs</a>

    // <a href="https://docs.friktion.fi/products/what-are-volts" target="_blank">What are Volts?</a>

    // <a href="https://docs.friktion.fi/" target="_blank">Friktion User Docs</a>

    // <a href="https://docs.friktion.fi/products/covered-call" target="_blank">Explanation on the most popular Volt - Generate Income</a>

    // <a href="https://docs.friktion.fi/risk-management-tools/analytics" target="_blank">View past performance of all our volts</a>

    // <a href="https://medium.com/friktion-research" target="_blank">Friktion research</a>   - we publish weekly “Zaps” that cover market insights!

    // <a href="https://github.com/Friktion-Labs/frontend" target="_blank">Open-sourced UI</a>

    // <a href="https://www.notion.so/da63728d3c994d4fbfd5487b83d4695d" target="_blank">Friktion in the Media</a>

    // `,
    //         githubUrl: 'some githubUrl',
    //         authorName: 'friktion_labs',
    //         authorGithub: 'Friktion-Labs',
    //         authorTwitter: 'friktion_labs',
    //         rewardValue: 1000,
    //         rewardType: 'points',
    //         createdAt: '2022-11-17T14:00:00',
    //         startDate: '2022-12-07T12:30:00',
    //         endDate: '2022-12-07T03:30:00',
    //         formComponents: [
    //             {
    //                 type: 'text',
    //                 field: 'firstAnswer',
    //                 key: 'firstAnswer',
    //                 label: 'Enter the github link to your unique implementation using the Friktion SDK',
    //                 placeholder: `Enter your answer...`,
    //             },
    //         ],
    //     },
    //     // ORAO VRF SDK Challenge 1
    //     {
    //         key: ++i,
    //         id: '221004048',
    //         iconKey: 0, // rocket
    //         iconSize: 35, // default
    //         title: 'ORAO VRF SDK Challenge 1',
    //         type: 'SDK',
    //         difficulty: 'Medium',
    //         shortDescription: 'Random numbers with ORAO using VRF',
    //         description: `
    // ___
    // ### Description

    // In this challenge you're going to learn to use the Orao Solana VRF SDK for random numbers!

    // Head to the SDK and Cookbook links where ORAO has outlined usage and comments on implementation.

    // You should be able to follow through the documentaiton and original source to produce your own random numbers!
    // Note there is a guide, rust documentation, and the SDK to reference.

    // You will only be able to find out some answers by running the examples yourself!

    // Good luck hunter!

    // ___
    // ### Tips

    // - The SDK github repo contains off-chain and on-chain (CPI) examples. Go through the code for both JS and Rust.

    // ___
    // ### Resources

    // <a href="https://github.com/orao-network/solana-vrf" target="_blank">ORAO VRF SDK</a>

    // <a href="https://solana-cookbook-4w4wfw5qs-solana-labs.vercel.app/integrations/orao-vrf.html" target="_blank">Cookbook integration goes through a lot of details</a>
    // `,
    //         githubUrl: 'some githubUrl',
    //         authorName: 'orao-network',
    //         authorGithub: 'orao-network',
    //         authorTwitter: 'OraoNetwork',
    //         rewardValue: 500,
    //         rewardType: 'points',
    //         createdAt: '2022-11-17T14:00:00',
    //         startDate: '2022-12-07T12:30:00',
    //         endDate: '2022-12-07T03:30:00',
    //         formComponents: [
    //             {
    //                 type: 'text',
    //                 field: 'firstAnswer',
    //                 key: 'firstAnswer',
    //                 label: 'How much does it cost to request randomness?',
    //                 placeholder: `Enter your answer...`,
    //             },
    //             {
    //                 type: 'text',
    //                 field: 'secondAnswer',
    //                 key: 'secondAnswer',
    //                 label: 'ORAO VRF is fast. How many transactions does it take for randomness to be fulfilled on devnet, including the request?',
    //                 placeholder: `Enter your answer...`,
    //             },
    //             {
    //                 type: 'text',
    //                 field: 'thirdAnswer',
    //                 key: 'thirdAnswer',
    //                 label: 'What is the name of the method to verify randomness off-chain?',
    //                 placeholder: `Enter your answer...`,
    //             },
    //             {
    //                 type: 'text',
    //                 field: 'fourthAnswer',
    //                 key: 'fourthAnswer',
    //                 label: 'Randomness is fulfilled by multiple nodes and is handled by the on-chain contract. What quorum type does the contract implement?',
    //                 placeholder: `Enter your answer...`,
    //             },
    //         ],
    //     },
    // -----------------------------------------------------------------------------------------
    // PAYMENTS CHALLENGES 18-11-22
    // -----------------------------------------------------------------------------------------
    // Solana Pay: Getting Started
    {
        key: ++i,
        id: '221118221',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Pay: Getting Started',
        type: 'Pay',
        difficulty: 'Easy',
        shortDescription: 'Learn all about Solana Pay and how to get started in minutes!',
        description: `
___
### Description
In this challenge we are going to review the following topics on Solana Pay:
 - What is Solana Pay?
 - Why use it?
 - What are some good resources?
 - How do I get started?
Start by visiting the <a href="https://solanapay.com/" target="_blank">Solana Pay official website</a> followed by
the official <a href="https://docs.solanapay.com/" target="_blank">Solana Pay Documentation</a>. Answers to the most common pay questions in addition to the challenge questions
are available from these resources. If you need additional help be sure to ask a team member onsite or using our event channels!
Good luck hunter!
___
### Tips
- In addition to the Solana Pay documentation a specification and technical API are also available in the resources section.
- Remember you can search and post questions on the  <a href="https://solana.stackexchange.com/" target="_blank">Solana stack exchange</a> to collaborate with the entire ecosystem!
- In addition to Solana stack exchange, the Solana U discord will be open for your event to ask questions to our community of students and educators.
___
### Resources
<a href="https://solanapay.com/" target="_blank">Solana Pay Official Website</a>
<a href="https://github.com/solana-labs/solana-pay" target="_blank">Solana Pay SDK</a>
<a href="https://docs.solanapay.com/" target="_blank">Solana Pay Docs</a>
<a href="https://docs.solanapay.com/spec" target="_blank">Solana Pay Specification</a>
<a href="https://docs.solanapay.com/api/core" target="_blank">Solana Pay API</a>
<a href="https://www.npmjs.com/package/@solana/pay" target="_blank">Solana Pay NPM: @solana/pay </a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'textArea',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What is Solana Pay?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'Why use Solana Pay?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What is a Solana Pay Transfer Request?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'What is a Solana Pay Transaction Request?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: ' What is the url for the Solana Pay API docs?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'sixthAnswer',
                key: 'sixthAnswer',
                label: 'What are some use cases for Solana Pay?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
        ],
    },
    // Feedback- Developer Experience
    {
        key: ++i,
        id: '221004003',
        iconKey: 0, // rocket (default)
        iconSize: 35, // default
        title: 'Solana Feedback',
        type: 'Feedback',
        difficulty: 'Easy',
        shortDescription: 'Give Feedback About Solana Developer Experience',
        description: `
___
### Description
In this challenge your mission is to give some feedback about Solana and your developer experience. Try to give feedback that might help Solana and the community identify improvements that could be made.
___
### Resources
<a href="https://docs.solana.com/developers" target="_blank">Solana Developer Docs</a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 100,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'textArea',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What feedback could you give that might help Solana and the community improve the protocol and network?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What on Solana needs major improvement?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What features, tooling, apps, or services are currently missing from Solana that you would like to see added?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'What do other chains do better that Solana should learn from?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'fifthAnswer',
                key: 'fifthAnswer',
                label: 'If you could change 1 thing about Solana, what would it be?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'sixthAnswer',
                key: 'sixthAnswer',
                label: 'What is 1 major thing lacking that would make Solana better?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'seventhAnswer',
                key: 'seventhAnswer',
                label: 'What new or improved resources or content for development would you like to see?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'eightAnswer',
                key: 'eightAnswer',
                label: 'Who on Solana has been the most influential in your Solana developer experience',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
        ],
    },
    // Solana Pay: Getting Started 2
    {
        key: ++i,
        id: '221118222',
        iconKey: 0, // rocket
        iconSize: 35, // default
        title: 'Solana Pay: Getting Started: 2',
        type: 'Pay',
        difficulty: 'Easy',
        shortDescription: 'Learn more about Solana Pay',
        description: `
___
### Description
In this challenge we are going to review some follow up questions to the getting started challenge
 - What types of requests are available?
 - What are some API method functions used?
 - What are some examples?
The same resources are provided from the getting started.
Let's see what you got!
___
### Tips
- In addition to the Solana Pay documentation a specification and technical API are also available in the resources section.
- Remember you can search and post questions on the  <a href="https://solana.stackexchange.com/" target="_blank">Solana stack exchange</a> to collaborate with the entire ecosystem!
- In addition to Solana stack exchange, the Solana U discord will be open for your event to ask questions to our community of students and educators.
___
### Resources
<a href="https://solanapay.com/" target="_blank">Solana Pay Official Website</a>
<a href="https://github.com/solana-labs/solana-pay" target="_blank">Solana Pay SDK</a>
<a href="https://docs.solanapay.com/" target="_blank">Solana Pay Docs</a>
<a href="https://docs.solanapay.com/spec" target="_blank">Solana Pay Specification</a>
<a href="https://docs.solanapay.com/api/core" target="_blank">Solana Pay API</a>
<a href="https://www.npmjs.com/package/@solana/pay" target="_blank">Solana Pay NPM: @solana/pay </a>
`,
        githubUrl: 'some githubUrl',
        authorName: 'donnysolana',
        authorGithub: 'donnysolana',
        authorTwitter: 'donnysolana',
        rewardValue: 50,
        rewardType: 'points',
        createdAt: '2022-11-17T14:00:00',
        startDate: '2022-12-07T12:30:00',
        endDate: '2022-12-07T03:30:00',
        formComponents: [
            {
                type: 'textArea',
                field: 'firstAnswer',
                key: 'firstAnswer',
                label: 'What types of requests are currently available with Solana Pay?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'secondAnswer',
                key: 'secondAnswer',
                label: 'What are 4 available methods available in the Solana Pay API?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'thirdAnswer',
                key: 'thirdAnswer',
                label: 'What is an example of a URL describing a transfer request for 1 SOL?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
            {
                type: 'textArea',
                field: 'fourthAnswer',
                key: 'fourthAnswer',
                label: 'What is an example URL describing a transaction request?',
                placeholder: `Enter your answer...`,
                maxLength: 200,
                rows: 3,
            },
        ],
    },
];
