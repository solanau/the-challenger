import _ from 'lodash';
import { db } from '../..';
import { getKeypairFromSecretString } from '../../util/keypair';
import { initializeMetaplex, mintToUser } from '../../util/metaplex';
import { BulkSendCertificateParams, ParticipationCertificateEntry, SendCerficateParams, SendCertificateResult, SendChunkItem, SendChunkParams, SendTestCerficateParams } from './interfaces';


const loggerF = (prefix: string, fn: (m: any, ...p: any[]) => void = console.log) => _.partial(fn, prefix)
const throwerF = (prefix: string) => (text: string) => { throw `${prefix} ${text}` }

const sendCertificate = async (params: SendCerficateParams): Promise<SendCertificateResult> => {
    const {
        resultCollectionFirebase,
        userId,
        eventId,
        cluster,
        candyMachineAddress,
        collectionUpdateAuthority,
        extraData
    } = params

    const loggerPrefix = `fn:sendCertificate user:${userId} event:${eventId} =>`
    const logger = loggerF(loggerPrefix)
    const loggerError = loggerF(loggerPrefix, console.error)
    const thrower = throwerF(loggerPrefix)

    try {
        logger("Transaction initiated!");
        logger(`Collection to save results: ${resultCollectionFirebase}`)
        await db.runTransaction(async (transaction) => {
            const user = await db.collection('users').doc(userId).get()

            const usersWithCertificateMinted = await db
                .collection('events')
                .doc(eventId)
                .collection(resultCollectionFirebase)
                .where('userId', "==", userId)

            const userWasMinted = await transaction.get(usersWithCertificateMinted)

            logger(`User exists in database: ${userWasMinted.size > 0}`);

            if (userWasMinted.size > 0) {
                thrower('User has already minted, throwing error')
            }

            const keypair = getKeypairFromSecretString()
            const metaplex = initializeMetaplex(cluster, keypair)
            const { nft, response } = await mintToUser(
                metaplex,
                keypair,
                user.data().walletPublicKey,
                candyMachineAddress,
                collectionUpdateAuthority
            )

            logger(`Minted NFT: ${nft.address.toString()}`);
            logger(`https://explorer.solana.com/address/${nft.address.toString()}`);
            logger(`https://explorer.solana.com/tx/${response.signature}`);

            const documentPath = `events/${eventId}/${resultCollectionFirebase}/${userId}`
            const doc = await db.doc(documentPath)

            const participationData: ParticipationCertificateEntry = {
                userId: userId,
                nftAddress: nft.address.toString(),
                signature: response.signature,
                extraData: extraData
            }

            await transaction.create(doc, participationData)
            logger(`Record in collection created`);

            //TODO: Send email

        });
        logger("Transaction successfully committed!");
        return { userId: userId, sent: true }
    } catch (e) {
        loggerError(`Transaction failed: ${e}`);
        //TODO: Send email to admin
        return { userId: userId, sent: false }
    }
}

const getUsersToExclude = async (collectionName: string, eventId: string) => {
    const usersWithCertificateMinted = await db
        .collection('events')
        .doc(eventId)
        .collection(collectionName)
        .select('userId')
        .get()

    const userIdsWithCertificateMinted =
        usersWithCertificateMinted.docs.map(x => x.data().userId)

    // Add a default element to the array to avoid firestore query error
    return _.isEmpty(userIdsWithCertificateMinted) ? ['empty'] : userIdsWithCertificateMinted
}

const sendChunk = async (index: number, acc: SendCertificateResult[], chunks: SendChunkItem[][], sendChunkParams: SendChunkParams) => {
    const { logger, cluster, eventId, candyMachineAddress, collectionUpdateAuthority, resultCollectionFirebase } = sendChunkParams
    if (index < chunks.length) {

        const chunk = chunks[index]
        logger(`Sending chunk ${index} with ${JSON.stringify(chunk)}`)
        // Send certificates in parallel
        const promises = chunk.map(
            sendChunkItem => sendCertificate({
                userId: sendChunkItem.userId,
                eventId: eventId,
                cluster,
                candyMachineAddress,
                collectionUpdateAuthority,
                extraData: sendChunkItem.extraData,
                resultCollectionFirebase
            } as SendCerficateParams)
        )
        const promisesResult = await Promise.all(promises)
        const result = promisesResult.concat(acc)

        return await sendChunk(index + 1, result, chunks, sendChunkParams)
    } else {
        return acc
    }
}

export const individualSendCertificate = async (params: SendTestCerficateParams) => {
    const { walletAddress, eventId, cluster, callerId } = params

    const loggerPrefix = `fn:individualSendCertificate user:${walletAddress} event:${eventId} =>`
    const logger = loggerF(loggerPrefix)
    const loggerError = loggerF(loggerPrefix, console.error)

    const event = await db.collection('events').doc(eventId).get()
    const eventManagers: string[] = event.get('managers')
    const user = await db.collection('users').doc(callerId).get()

    const isManager = eventManagers.find(
        manager => manager == callerId) != undefined
    const isAdmin = user.get('isAdmin') == true

    if (isManager == false && isAdmin == false) {
        return false
    }

    const participationNFT = event.data().participationNFT || {}

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

    try {
        const keypair = getKeypairFromSecretString()
        const metaplex = initializeMetaplex(cluster, keypair)

        logger(`Minting from candy machine: ${candyMachineAddress}`);
        logger(`Minting with authority: ${collectionUpdateAuthority}`);
        logger(`Keypair public key: ${keypair.publicKey.toBase58()}`);

        const { nft, response } = await mintToUser(
            metaplex,
            keypair,
            walletAddress,
            candyMachineAddress,
            collectionUpdateAuthority
        )

        logger(`Minted NFT: ${nft.address.toString()}`);
        logger(`https://explorer.solana.com/address/${nft.address.toString()}`);
        logger(`https://explorer.solana.com/tx/${response.signature}`);
        return true
    } catch (e) {
        loggerError(`Transaction failed: ${e}`);
        return false
    }

}

export const bulkSendParticipationCertificates = async (params: BulkSendCertificateParams) => {
    const { eventId, cluster, callerId } = params

    const loggerPrefix = (eventId: string) => `fn:bulkSendParticipationCertificates event:${eventId} =>`
    const logger = loggerF(loggerPrefix(eventId))

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

    const participationNFT = event.data().participationNFT || {}

    if (!_.isEmpty(participationNFT)) {

        const resultCollection = 'users-participation-nfts'
        const usersToExclude = await getUsersToExclude(resultCollection, eventId)

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
            if (valueToAdd) acc.push({ userId: key, extraData: null })
            return acc
        }, [])

        const usersFiltered = !_.isNil(maxUsersToCertificate) ?
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

        const chunks = _.chunk(usersFiltered, 5)

        const params = {
            logger,
            cluster,
            eventId,
            candyMachineAddress,
            collectionUpdateAuthority,
            resultCollectionFirebase: resultCollection
        } as SendChunkParams
        const results = await sendChunk(0, [], chunks, params)

        return _.flatMap(results)
    } else {
        // Nothing was sent, return empty array
        return Promise.resolve([])
    }

}

export const bulkSendTopLoaderboardCertificates = async (params: BulkSendCertificateParams) => {
    const { eventId, cluster, callerId } = params

    const loggerPrefix = (eventId: string) => `fn:bulkSendTopLoaderboardCertificates event:${eventId} =>`
    const logger = loggerF(loggerPrefix(eventId))

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

    const topLeaderboardNFT = event.data().topLeaderboardNFT || {}

    if (!_.isEmpty(topLeaderboardNFT)) {

        const resultCollection = 'users-top-leaderboard-nfts'
        const usersToExclude = await getUsersToExclude(resultCollection, eventId)

        const minPoints = topLeaderboardNFT.minPoints
        const maxUsersToCertificate = topLeaderboardNFT.maxUsersToCertificate

        const leaderboard = (await db.doc(`events/${eventId}/`)
            .collection('leader-boards')
            .doc("individual")
            .get()).data()

        const filteredUsers = _.differenceWith(
            leaderboard.participants,
            usersToExclude,
            (participantLeaderboard: any, userToExclude: string) => {
                return participantLeaderboard.userId == userToExclude
            }
        )

        const filteredUsersWithMinPoints = _.filter(filteredUsers, participant => {
            return participant.points >= minPoints
        })

        const usersFiltered = !_.isNil(maxUsersToCertificate) ?
            filteredUsersWithMinPoints.slice(0, maxUsersToCertificate)
            : filteredUsersWithMinPoints

        const usersWithExtraData = _.map(usersFiltered, user => {
            return {
                userId: user.userId,
                extraData: {
                    points: user.points
                },
            }
        })

        // Mint NFT for users and save them in Firestore
        // Get candy machine adddress
        const candyMachineAddress = topLeaderboardNFT.candyMachineAddress
        if (_.isNil(candyMachineAddress)) {
            //TODO: Send an email to inform managers candyMachine has not been set
            return false
        }
        // Get collection update authority adddress
        const collectionUpdateAuthority = topLeaderboardNFT.collectionUpdateAuthority
        if (_.isNil(collectionUpdateAuthority)) {
            //TODO: Send an email to inform managers candyMachine has not been set
            return false
        }

        const chunks = _.chunk(usersWithExtraData, 5)

        const params = {
            logger,
            cluster,
            eventId,
            candyMachineAddress,
            collectionUpdateAuthority,
            resultCollectionFirebase: resultCollection
        } as SendChunkParams
        const results = await sendChunk(0, [], chunks, params)

        return _.flatMap(results)
    } else {
        // Nothing was sent, return empty array
        return Promise.resolve([])
    }
}