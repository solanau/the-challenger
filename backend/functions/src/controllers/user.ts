import { db } from '..';
import { MASTER_API_KEY } from '../util/const';
import { DatabaseError, MasterApiKeyError } from '../util/util';

const objectType = 'User';

exports.createNewUser = async function (req, res) {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError());
        res.status(400).send(MasterApiKeyError());
    } else {
        try {
            // verify userName is not duplicate -> transaction
            const { id } = req.body;
            await db.doc(`users/${id}`).set(req.body);
            res.status(201).send({
                userId: id,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(DatabaseError(objectType));
        }
    }
};
