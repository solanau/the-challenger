import { PublicKey } from '@solana/web3.js';
import { createEvent, updateEvent } from 'prestige-protocol';
import { db } from '..';
import {
    connection,
    MASTER_API_KEY,
    PRESTIGE_PROGRAM_ID,
    WALLET
} from '../util/const';
import { EventPayload } from '../util/types';
import {
    DatabaseError,
    MasterApiKeyError,
    PayloadError,
    PrestigeError
} from '../util/util';

interface EventDto {
    pubkey: string;
    authority: string;
}

const objectType = 'Event';
const eventCollection = 'events';

exports.fetchEventsForAuthority = async (req, res) => {
    try {
        const eventQuerySnapshot = await db.collection(eventCollection).get();
        const events: EventPayload[] = [];
        eventQuerySnapshot.forEach(async doc => {
            const data: any = doc.data();
            if (data.authority === req.params.authority) {
                events.push(data);
            }
        });
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.createNewEvent = async (req, res) => {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        let rawEvent: Omit<EventPayload, 'pubkey'>;
        let eventPubkey: PublicKey;
        try {
            rawEvent = {
                authority: req.body['authority'],
                title: req.body['title'],
                description: req.body['description'],
                location: req.body['location'],
                host: req.body['host'],
                date: req.body['date'],
            };
        } catch (error) {
            console.log(error);
            res.status(400).send(PayloadError());
        }
        try {
            eventPubkey = (
                await createEvent(
                    connection,
                    WALLET,
                    PRESTIGE_PROGRAM_ID,
                    rawEvent.title,
                    rawEvent.description,
                    rawEvent.location,
                    rawEvent.host,
                    rawEvent.date,
                )
            )[0];
        } catch (error) {
            console.log(error);
            res.status(500).send(PrestigeError(objectType));
        }
        try {
            const event: EventDto = {
                pubkey: eventPubkey.toBase58(),
                ...rawEvent,
            };
            const newDoc = await db.collection(eventCollection).add(event);
            res.status(201).send({
                pubkey: eventPubkey.toBase58(),
                firebaseEventId: newDoc.id
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};

exports.updateEvent = async (req, res) => {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        let rawEvent: EventPayload;
        try {
            rawEvent = {
                pubkey: req.body['pubkey'],
                authority: req.body['authority'],
                title: req.body['title'],
                description: req.body['description'],
                location: req.body['location'],
                host: req.body['host'],
                date: req.body['date'],
            };
        } catch (error) {
            console.log(error);
            res.status(400).send(PayloadError());
        }
        try {
            await updateEvent(
                connection,
                WALLET,
                PRESTIGE_PROGRAM_ID,
                new PublicKey(rawEvent.pubkey),
                rawEvent.title,
                rawEvent.description,
                rawEvent.location,
                rawEvent.host,
                rawEvent.date,
            );
        } catch (error) {
            console.log(error);
            res.status(500).send(PrestigeError(objectType));
        }
        try {
            const event: EventDto = { ...rawEvent };
            const newDoc = await db
                .collection(eventCollection)
                .doc(req.params.id)
                .set(event);
            res.status(201).send(`Updated event: ${event.pubkey}`);
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};
