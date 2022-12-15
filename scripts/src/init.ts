import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { mockChallenges } from "../../app/src/mocks/challenges";
import { mockEvents } from "../../app/src/mocks/events";

dotenv.config({ path: path.resolve(process.cwd(), "../app/.env") });

async function initDb() {
  await axios
    .post(
      process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
        "/init/" +
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY
    )
    .then((res) => res.data);
  console.log("\n\n ==>  Collections initialized.\n");
}

async function importChallenges(mockChallengesList) {
  for (const chal of mockChallengesList) {
    await axios
      .post(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
          "/challenge/" +
          process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
        chal
      )
      .then((res) => res.data.pubkey);
  }
  console.log("\n\n ==>  Challenges initialized.\n");
}

async function importEvents(mockEventsList, mockChallengesList) {
  for (const mockEvent of mockEventsList) {
    const event = { eventChallenges: mockChallengesList, ...mockEvent };
    await axios
      .post(
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
          "/event/" +
          process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY,
        event
      )
      .then((res) => ({
        id: res.data.eventId,
        publicKey: res.data.publicKey,
      }));
  }
  console.log("\n\n ==>  Events initialized.\n");
}

async function main() {
  await initDb();
  await importChallenges(mockChallenges);
  await importEvents(mockEvents, mockChallenges);
}

main();
