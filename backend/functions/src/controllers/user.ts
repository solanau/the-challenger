import * as functions from 'firebase-functions';
import { db } from '..';
import { Auth, SetUserPayload } from '../util/types';

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

class UserController {
    async setUser(auth: Auth, payload: SetUserPayload) {
        if (await isDuplicateUserName(auth.id, payload.userName)) {
            throw new functions.https.HttpsError(
                'already-exists',
                `There's a user with that user name already.`,
            );
        }

        await db.doc(`users/${auth.id}`).set({
            fullName: payload.fullName,
            userName: payload.userName,
            email: auth.email,
            walletPublicKey: payload.walletPublicKey,
        });

        return payload;
    }
}

export const controller = new UserController();
