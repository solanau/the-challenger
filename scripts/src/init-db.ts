import axios from "axios";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), "../app/.env") });

async function main() {
  await axios
    .get(
      process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_ENDPOINT +
        "/init/" +
        process.env.NEXT_PUBLIC_HEAVY_DUTY_BOUNTY_API_MASTER_API_KEY
    )
    .then((res) => res.data);

  console.log("\n\n ==>  Collections initialized.\n");
}

main();
