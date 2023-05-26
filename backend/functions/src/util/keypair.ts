import { Keypair } from "@solana/web3.js"
import { PK_SECRET_KEY } from "./const"

export const getKeypairFromSecretString = () => {
    const privateKeyAsString = process.env[PK_SECRET_KEY]
    const keypairArray = JSON.parse(privateKeyAsString)
    return Keypair.fromSecretKey(Uint8Array.from(keypairArray))
}