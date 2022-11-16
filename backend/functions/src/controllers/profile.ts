import { db } from "..";
import { MASTER_API_KEY } from "../util/const";
import { ProfilePayload } from "../util/types";
import { DatabaseError, MasterApiKeyError } from "../util/util";

const objectType = "Profile";
const profileCollection = "profiles";

// Doesn't load from chain
exports.fetchProfileForPubkey = async (req, res) => {
  try {
    const profileQuerySnapshot = await db.collection(profileCollection).get();
    const profiles: ProfilePayload[] = [];
    profileQuerySnapshot.forEach(async (doc) => {
      const data: any = doc.data();
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
  if (req.params.masterApiKey != MASTER_API_KEY) {
    console.error(MasterApiKeyError());
    res.status(400).send(MasterApiKeyError());
  } else {
    try {
      const profile: ProfilePayload = {
        pubkey: req.body["pubkey"],
        username: req.body["username"],
      };
      const newDoc = await db.collection(profileCollection).add(profile);
      res.status(201).send(profile);
    } catch (error) {
      console.log(error);
      res.status(500).send(DatabaseError(objectType));
    }
  }
};

exports.updateProfile = async (req, res) => {
  if (req.params.masterApiKey != MASTER_API_KEY) {
    console.error(MasterApiKeyError());
    res.status(400).send(MasterApiKeyError());
  } else {
    try {
      const profile: ProfilePayload = {
        pubkey: req.body["pubkey"],
        username: req.body["username"],
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
