import _ from 'lodash';
import { db } from '..';
import { getKeypairFromSecretString } from '../util/keypair';
import { initializeMetaplex } from '../util/metaplex';

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


const loggerF = (prefix: string, fn: (m: any, ...p: any[]) => void = console.log) => _.partial(fn, prefix)
const throwerF = (prefix: string) => (text: string) => { throw `${prefix} ${text}` }

const sendCertificate = async (toUserId: string, forEventId: string, cluster: string, candyMachineAddress: string, collectionUpdateAuthority: string) => {

    const loggerPrefix = (userId: string, eventId: string) => `fn:sendCertificate user:${userId} event:${eventId} =>`
    const logger = loggerF(loggerPrefix(toUserId, forEventId))
    const thrower = throwerF(loggerPrefix(toUserId, forEventId))

    logger(`Working on cluster ${cluster}`)

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
            // let { nft, response } = await mintToUser(
            //     metaplex,
            //     keypair,
            //     user.data().walletPublicKey,
            //     candyMachineAddress,
            //     collectionUpdateAuthority
            // )

            // logger(`Minted NFT: ${nft.address.toString()}`);
            // logger(`https://explorer.solana.com/address/${nft.address.toString()}`);
            // logger(`https://explorer.solana.com/tx/${response.signature}`);

            // const documentPath = `events/${forEventId}/${collectionName}/${toUserId}`
            // const doc = await db.doc(documentPath)

            // const participationData: ParticipationCertificateEntry = {
            //     userId: toUserId,
            //     nftAddress: nft.address.toString(),
            //     signature: response.signature
            // }

            // await transaction.create(doc, participationData)
            // logger(`Record in collection created`);

            //TODO: Send email

        });
        logger("Transaction successfully committed!");
        return { userId: toUserId, sent: true }
    } catch (e) {
        logger(`Transaction failed: ${e}`, console.error);
        //TODO: Send email to admin
        return { userId: toUserId, sent: false }
    }
}

export const bulkSendCertificates = async (params: BulkSendCertificateParams) => {
    const { eventId, cluster, callerId } = params

    const loggerPrefix = (eventId: string) => `fn:bulkSendCertificates event:${eventId} =>`
    const logger = loggerF(loggerPrefix(eventId))

    const event = await db.collection('events').doc(eventId).get()
    const user = await db.collection('users').doc(callerId).get()
    const eventManagers: string[] = event.get('managers')

    const usersWithCertificateMinted = await db
        .collection('events')
        .doc(eventId)
        .collection(collectionName)
        .select('userId')
        .get()

    const userIdsWithCertificateMinted =
        usersWithCertificateMinted.docs.map(x => x.data().userId)

    // Add a default element to the array to avoid firestore query error
    const usersToExclude =
        _.isEmpty(userIdsWithCertificateMinted) ? ['empty'] : userIdsWithCertificateMinted

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
            .where('userId', 'not-in', usersToExclude)
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


        const sendChunk = async (index, acc, chunks) => {
            if (index.length < chunks.length) {

                const chunk = chunks[index]
                logger(`Sending chunk ${index} with ${chunk}`)
                // Send certificates in parallel
                const promises = chunk.map(
                    userId => sendCertificate(
                        userId,
                        eventId,
                        cluster,
                        candyMachineAddress,
                        collectionUpdateAuthority
                    )
                )
                const promisesResult = await Promise.all(promises)
                const result = promisesResult.concat(acc)
                return result
            } else {
                return sendChunk(index + 1, acc, chunks)
            }
        }

        const testChunks = [
            "userId1",
            "userId2",
            "userId3",
            "userId4",
            "userId5",
            "userId6",
            "userId7",
            "userId8",
            "userId9",
            "userId10",
            "userId11",
            "userId12",
            "userId13",
        ]

        // const chunks = _.chunk(usersFilteredByMinimumSliced, 5)
        const chunks = _.chunk(testChunks, 5)

        const results = await sendChunk(0, [], chunks)

        // // Send certificates in parallel
        // const promises = usersFilteredByMinimumSliced.map(
        //     userId => sendCertificate(
        //         userId,
        //         eventId,
        //         cluster,
        //         candyMachineAddress,
        //         collectionUpdateAuthority
        //     )
        // )
        // const promisesResult = await Promise.all(promises)

        return _.flatMap(results)
    } else {
        // Nothing was sent, return empty array
        return Promise.resolve([])
    }

}