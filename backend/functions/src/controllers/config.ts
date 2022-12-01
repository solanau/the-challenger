import { db } from '..';
import { ConfigPayload } from '../../../../app/src/types/api';
import { MASTER_API_KEY } from '../util/const';
import { DatabaseError, MasterApiKeyError, PayloadError } from '../util/util';

const objectType = 'Config';
const configCollection = 'configs';

exports.fetchConfig = async (req, res) => {
    try {
        const config = await db.doc(`${configCollection}/0`).get();

        console.log(config.id);

        res.status(200).json({
            id: config.id,
            ...config.data(),
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.updateConfig = async (req, res) => {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        const configs: ConfigPayload[] = [];
        try {
            const configQuerySnapshot = await db
                .collection(configCollection)
                .get();
            configQuerySnapshot.forEach(async doc => {
                const data: any = doc.data();
                if (data.id === req.params.id) {
                    configs.push(data);
                }
            });
        } catch {}
        let config: ConfigPayload;
        try {
            config = {
                ...configs[0],
                ...req.body,
            };
        } catch (error) {
            console.log(error);
            res.status(400).send(PayloadError());
        }
        try {
            const newDoc = await db.doc(`${configCollection}/${0}`).set(config);
            res.status(201).send(`Updated configs`);
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};
