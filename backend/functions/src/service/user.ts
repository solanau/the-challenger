import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import * as functions from 'firebase-functions';
import { sign } from 'tweetnacl';
import { Auth, db, SetUserPayload } from '..';

const validateSignedMessage = (
    message: Uint8Array,
    signature: Uint8Array,
    publicKey: PublicKey,
): boolean => sign.detached.verify(message, signature, publicKey.toBytes());

export const isDuplicateUserName = async (
    currentUserId: string,
    userName: string,
) => {
    const usersWithSameUsername = await db
        .collection(`users`)
        .where('userName', '==', userName)
        .get();

    return (
        !usersWithSameUsername.empty &&
        usersWithSameUsername.docs.some(doc => doc.id !== currentUserId)
    );
};

class UserService {
    async getAllUsers() {
        return (await db.doc(`users`).get()).data();
    }

    async setUser(auth: Auth, payload: SetUserPayload) {
        if (payload.message && payload.signature && payload.walletPublicKey) {
            if (
                !validateSignedMessage(
                    bs58.decode(payload.message),
                    bs58.decode(payload.signature),
                    new PublicKey(payload.walletPublicKey),
                )
            )
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Invalid message signature!`,
                );
        }

        if (await isDuplicateUserName(auth.id, payload.userName)) {
            throw new functions.https.HttpsError(
                'already-exists',
                `There's a user with that user name already.`,
            );
        }

        await db.doc(`users/${auth.id}`).set({
            email: auth.email,
            ...payload,
        });

        return payload;
    }

    async updateUser(auth: Auth, payload: SetUserPayload) {
        if (payload.message && payload.signature && payload.walletPublicKey) {
            if (
                !validateSignedMessage(
                    bs58.decode(payload.message),
                    bs58.decode(payload.signature),
                    new PublicKey(payload.walletPublicKey),
                )
            )
                throw new functions.https.HttpsError(
                    'failed-precondition',
                    `Invalid message signature!`,
                );
        }

        if (await isDuplicateUserName(auth.id, payload.userName)) {
            throw new functions.https.HttpsError(
                'already-exists',
                `There's a user with that user name already.`,
            );
        }

        await db.doc(`users/${auth.id}`).update({
            email: auth.email,
            ...payload,
        });

        return payload;
    }
}

export const userService = new UserService();
