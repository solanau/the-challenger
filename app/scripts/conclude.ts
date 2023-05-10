import { fetchAllSubmissions, issueAllRewardsForChallenge } from "../src/lib/api";
import { getIssuesPagingUpgrade } from "../src/lib/github";
import { getChallengeIdAndCompletionStatusForIssue } from "../src/utils/challenge";


require('dotenv').config();


/**
 * This script will issue the proper on-chain rewards to every challenge submitter.
 * 
 * We can run this once we've graded all submissions and are ready to issue 
 *  XP Tokens and NFT Badges.
 */


async function main() {

    console.log("Issuing rewards...") ;

    const allSubmissionsFromDb = new Map((await fetchAllSubmissions()).map((i) => [i.issueId, i]));

    const allIssues = await getIssuesPagingUpgrade();
    if (!allIssues) throw("Error. No submissions found.");

    const completedSubmissionsFromGithub = new Map(
        allIssues
            .filter((i) => getChallengeIdAndCompletionStatusForIssue(i)[1] === 'completed')
            .map((i) => [i.id, i])
    );

     let x = 1;
     let t = completedSubmissionsFromGithub.size;
     for (var issueId of completedSubmissionsFromGithub.keys()) {

        const submission = allSubmissionsFromDb.get(issueId);
        if (!submission) {
            console.log(`Issue ID #${issueId} not found. Skipping.`)
            continue;
        };
         
        await issueAllRewardsForChallenge({
             challengePubkey: submission.challengePubkey,
             userPubkey: submission.userPubkey,
         });
 
         console.log(`   All rewards issued for submission ${x}/${t}.`);
         x++;
     };
 
     console.log("All rewards issued.");
}


main()