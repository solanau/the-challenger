import * as functions from 'firebase-functions';
import { Auth, db, SetUserPayload } from '..';

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
