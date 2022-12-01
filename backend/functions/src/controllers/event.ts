import { PublicKey } from '@solana/web3.js';
import { createEvent, updateEvent } from 'prestige-protocol';
import { db } from '..';
import { EventPayload } from '../../../../app/src/types/api';
import { connection, MASTER_API_KEY, WALLET } from '../util/const';
import {
    DatabaseError,
    MasterApiKeyError,
    PayloadError,
    PrestigeError,
} from '../util/util';

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
            const event: EventPayload = {
                pubkey: eventPubkey.toBase58(),
                ...rawEvent,
            };
            const newDoc = await db.collection(eventCollection).add(event);
            res.status(201).send({
                pubkey: eventPubkey.toBase58(),
                firebaseEventId: newDoc.id,
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
            const event: EventPayload = { ...rawEvent };
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
