import _ from 'lodash';
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

const collectionName = 'users-participation-nfts'

const sendCertificate = async (toUserId: string, forEventId: string, cluster: string, candyMachineAddress: string, collectionUpdateAuthority: string) => {

    const prefix = `user:${toUserId} event:${forEventId} =>`
    const logger = (text: string, fn: (m: any, ...p: any[]) => void = console.log) => fn(`${prefix} ${text}`);
    const thrower = (text: string) => { throw `${prefix} ${text}` };

    try {
        await db.runTransaction(async (transaction) => {
            const user = await db.collection('users').doc(toUserId).get()

            const usersWithCertificateMinted = await db
                .collection('events')
                .doc(forEventId)
                .collection(collectionName)
                .where('userId', "==", toUserId)

            const userWasMinted = await transaction.get(usersWithCertificateMinted)

            logger(`User exists in database: ${userWasMinted.size > 0}`);

            if (userWasMinted.size > 0) {
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
        logger(`Transaction failed: ${e}`, console.error);
        //TODO: Send email to admin
        return false
    }
}

export const bulkSendCertificates = async (params: BulkSendCertificateParams) => {
    const { eventId, cluster, callerId } = params

    const event = await db.collection('events').doc(eventId).get()
    const user = await db.collection('users').doc(callerId).get()
    const eventManagers: string[] = event.get('managers')

    const usersWithCertificateMinted = await db
        .collection('events')
        .doc(eventId)
        .collection(collectionName)
        .select('userId')
        .get()

    const userIdsWithCertificateMinted = usersWithCertificateMinted.docs.map(x => x.data().userId)

    // return Promise.resolve([])

    // Do not allow to mint if user is not an admin or an event manager
    const isManager = eventManagers.find(
        manager => manager == callerId) != undefined
    const isAdmin = user.get('isAdmin') == true

    if (isManager == false && isAdmin == false) {
        return false
    }

    const participationNFT = event.data().participationNFT || {}

    if (!_.isEmpty(participationNFT)) {
        // Get users from leaderboard
        const minChallengesToCertificate = participationNFT.minChallengesToCertificate
        const maxUsersToCertificate = participationNFT.maxUsersToCertificate
        const submissions = (await db.doc(`events/${eventId}/`)
            .collection('submissions')
            .where('userId', 'not-in', userIdsWithCertificateMinted)
            .select('userId')
            .get()).docs.map(x => x.data()) as { [key: string]: string }[]


        const groupedByUserId = _.groupBy(submissions, 'userId')
        const usersFilteredByMinimum = _.transform(groupedByUserId, (acc, curr, key, dict) => {
            const value = dict[key]
            const valueToAdd = value.length >= minChallengesToCertificate ? key : null
            if (valueToAdd) acc.push(key)
            return acc
        }, [])

        const usersFilteredByMinimumSliced =
            !_.isNil(maxUsersToCertificate) ?
                usersFilteredByMinimum.slice(0, maxUsersToCertificate)
                : usersFilteredByMinimum

        // Mint NFT for users and save them in Firestore
        // Get candy machine adddress
        const candyMachineAddress = participationNFT.candyMachineAddress
        if (_.isNil(candyMachineAddress)) {
            //TODO: Send an email to inform managers candyMachine has not been set
            return false
        }
        // Get collection update authority adddress
        const collectionUpdateAuthority = participationNFT.collectionUpdateAuthority
        if (_.isNil(collectionUpdateAuthority)) {
            //TODO: Send an email to inform managers candyMachine has not been set
            return false
        }
        // Send certificates in parallel
        const promises = usersFilteredByMinimumSliced.map(
            userId => sendCertificate(
                userId,
                eventId,
                cluster,
                candyMachineAddress,
                collectionUpdateAuthority
            )
        )
        const promisesResult = await Promise.all(promises)

        return promisesResult
    } else {
        // Nothing was sent, return empty array
        return Promise.resolve([])
    }

}