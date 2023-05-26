import * as _ from 'lodash';
import { db } from '..';
import { getKeypairFromSecretString } from '../util/keypair';
import { initializeMetaplex, mintToUser } from '../util/metaplex';

export interface SendCertificates {
    eventId: string
}

export interface BulkSendCertificateParams {
    eventId: string;
    cluster: string;
    callerId: string;
}

interface ParticipationCertificateEntry {
    userId: string;
    nftAddress: string;
    signature: string;
}

const sendCertificate = async (toUserId: string, forEventId: string, cluster: string, candyMachineAddress: string, collectionUpdateAuthority: string) => {

    const prefix = `user:${toUserId} event:${forEventId} =>`
    const logger = (text: string) => console.log(`${prefix} ${text}`);
    const thrower = (text: string) => { throw `${prefix} ${text}` };

    try {
        await db.runTransaction(async (transaction) => {
            const user = await db.collection('users').doc(toUserId).get()

            const collectionName = 'users-participation-recognition'

            const userWasMintedQuery = await db
                .collection('events')
                .doc(forEventId)
                .collection(collectionName)
                .where('userId', "==", toUserId)

            const userWasMinted = await transaction.get(userWasMintedQuery)

            logger(`User exists in database: ${userWasMinted.size > 0}`);

            if (userWasMinted.size > 0) {
                // throw `${prefix} User has already minted, throwing error`;
                thrower('User has already minted, throwing error')
            }

            const keypair = getKeypairFromSecretString()
            const metaplex = initializeMetaplex(cluster, keypair)
            let { nft, response } = await mintToUser(
                metaplex,
                keypair,
                user.data().walletPublicKey,
                candyMachineAddress,
                collectionUpdateAuthority
            )

            logger(`Minted NFT: ${nft.address.toString()}`);
            logger(`https://explorer.solana.com/address/${nft.address.toString()}`);
            logger(`https://explorer.solana.com/tx/${response.signature}`);

            const documentPath = `events/${forEventId}/${collectionName}/${toUserId}`
            const doc = await db.doc(documentPath)

            const participationData: ParticipationCertificateEntry = {
                userId: toUserId,
                nftAddress: nft.address.toString(),
                signature: response.signature
            }

            await transaction.create(doc, participationData)
            logger(`Record in collection created`);

            //TODO: Send email

        });
        logger("Transaction successfully committed!");
        return true
    } catch (e) {
        logger(`Transaction failed: ${e}`);
        //TODO: Send email to admin
        return false
    }
}

export const bulkSendCertificates = async (params: BulkSendCertificateParams) => {
    const { eventId, cluster, callerId } = params

    const event = await db.collection('events').doc(eventId).get()
    const user = await db.collection('users').doc(callerId).get()
    const eventManagers: string[] = event.get('managers')

    // Do not allow to mint if user is not an admin or an event manager
    const isManager = eventManagers.find(
        manager => manager == callerId) != undefined
    const isAdmin = user.get('isAdmin') == true

    if (isManager == false && isAdmin == false) {
        return false
    }

    // Get users from leaderboard
    const minChallengesToCertificate = event.data().minChallengesToCertificate
    const submissions = (await db.doc(`events/${eventId}/`)
        .collection('submissions')
        .select('userId')
        .get()).docs.map(x => x.data()) as { [key: string]: string }[]


    const groupedByUserId = _.groupBy(submissions, 'userId')
    const usersFilteredByMinimum = _.transform(groupedByUserId, (acc, curr, key, dict) => {
        const value = dict[key]
        const valueToAdd = value.length >= minChallengesToCertificate ? key : null
        if (valueToAdd) acc.push(key)
        return acc
    }, [])

    console.log('usersFilteredByMinimum ===>', usersFilteredByMinimum)

    // Mint NFT for users and save them in Firestore
    // Get candy machine adddress
    const candyMachineAddress = event.data().candyMachineAddress
    if (_.isNil(candyMachineAddress)) {
        //TODO: Send an email to inform managers candyMachine has not been set
        return false
    }
    // Get collection update authority adddress
    const collectionUpdateAuthority = event.data().collectionUpdateAuthority
    if (_.isNil(collectionUpdateAuthority)) {
        //TODO: Send an email to inform managers candyMachine has not been set
        return false
    }
    // Send certificates in parallel
    const promises = usersFilteredByMinimum.map(
        userId => sendCertificate(userId, eventId, params.cluster, candyMachineAddress, collectionUpdateAuthority))
    const promisesResult = await Promise.all(promises)

    return promisesResult

}