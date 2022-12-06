import { MasterApiKeyError, MASTER_API_KEY } from '../util/const';
import { init } from '../util/db';

const initDb = async (req, res) => {
    if (req.params.masterApiKey != MASTER_API_KEY) {
        console.error(MasterApiKeyError);
        res.status(401).send(MasterApiKeyError);
    } else {
        try {
            const dbResponse = await init();
            res.status(200).json('Database initialized.');
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

export default {
    initDb,
};
