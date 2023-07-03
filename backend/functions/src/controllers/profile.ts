import { db } from '..';
import { MASTER_API_KEY } from '../util/const';
import { DatabaseError, MasterApiKeyError } from '../util/util';

const objectType = 'Profile';
const profileCollection = 'profiles';

exports.fetchProfileForPubkey = async (req, res) => {
  try {
    const profileQuerySnapshot = await db
      .collection(profileCollection)
      .get();
    const profiles = [];
    profileQuerySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.pubkey === req.params.pubkey) {
        profiles.push(data);
      }
    });
    res.status(200).json(profiles);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

exports.createNewProfile = async (req, res) => {
  if (req.params.masterApiKey !== MASTER_API_KEY) {
    console.error(MasterApiKeyError());
    res.status(400).send(MasterApiKeyError());
  } else {
    try {
      const profile = {
        pubkey: req.body.pubkey,
        username: req.body.username,
        fullName: req.body.fullName,
        userName: req.body.userName,

        walletPublicKey: req.body.walletPublicKey,
        avatar: req.body.avatar,
        skills: Array.isArray(req.body.skills) ? req.body.skills : [],


      };
      console.log(profile);
      const newDoc = await db.collection(profileCollection).add(profile);
      console.log(newDoc);
      console.log(profile);
      res.status(201).send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send(DatabaseError(objectType));
    }
  }
};

exports.updateProfile = async (req, res) => {
  if (req.params.masterApiKey !== MASTER_API_KEY) {
    console.error(MasterApiKeyError());
    res.status(400).send(MasterApiKeyError());
  } else {
    try {
      const profile = {
        pubkey: req.body.pubkey,
        username: req.body.username,
        fullName: req.body.fullName,
        userName: req.body.userName,
  
        walletPublicKey: req.body.walletPublicKey,
        avatar: req.body.avatar,
        skills: JSON.parse(req.body.skills || '[]'),
      };
      const newDoc = await db
        .collection(profileCollection)
        .doc(req.params.id)
        .set(profile);
      res.status(201).send(`Updated profile: ${profile.pubkey}`);
    } catch (error) {
      console.log(error);
      res.status(500).send(DatabaseError(objectType));
    }
  }
};
