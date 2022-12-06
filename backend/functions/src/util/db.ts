import { db } from '..';

export async function init(): Promise<void> {
    try {
        await db.doc('/challenges/0').set({ challenges: [] });
        await db.doc('/events/0').set({ events: [] });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function loadTopLevelDoc(collection: string): Promise<any> {
    try {
        return (await db.doc(`${collection}/0`).get()).data();
    } catch (error) {
        throw error;
    }
}

export async function updateTopLevelDoc(
    collection: string,
    doc: any,
): Promise<void> {
    try {
        await db.doc(`${collection}/0`).set(doc);
    } catch (error) {
        throw error;
    }
}
