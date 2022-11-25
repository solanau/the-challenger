# Firebase Backend for Bounty Program

This Express backend writes the following objects to the DB:

- Events
- Challenges
- Prizes
- XP Tokens
- NFT Badges

There are a couple of one-off scripts that handle DB operations located in the `scripts` folder.

### Database Support

The frontend renders all challenges from the database, instead of from the `mockChallenges` object. The data type is almost the same as before, with a few additional fields:

- nftBadge?: Marks whether or not this challenge also rewards an NFT
- challengePubkey: The address of this challenge's on-chain data
- eventPubkey: The address of this challenge's associated event's on-chain data

The submissions themselves are still determined from GitHub issues. These two items are cross-referenced when rendering things like a user's profile page.

### On-Chain Rewards

This backend makes use of `prestige-protocol` to mint users rewards on-chain for completing Bounty Challenges.

The "points" we are tallying for submissions will be minted to user's wallets as a "Heavy Duty Bounty XP Token".

I've also got one NFT per challenge difficulty that can be minted along with the XP tokens, simply by adding the optional field `nftBadge?: boolean` to the ChallengePayload object.

The script `conclude` would issue these rewards once submission reviews are completed.
