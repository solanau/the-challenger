import { Keypair } from "@solana/web3.js"
import { initializeMetaplex, mintToUser } from "../util/metaplex"

export const bulkSendCertificates = async (privateKeyAsString: string, eventId: string, cluster: string) => {
    const keypairArray = JSON.parse(privateKeyAsString)
    const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairArray))
    const metaplex = initializeMetaplex(cluster, keypair)
    let { nft, response } = await mintToUser(
        metaplex,
        keypair,
        "Ab5X897ycK7ZHDpaxyHiuCrh4Sbo2tMd81VBfQJGJz8J",
        "EZ6CLK1JGiuZnggv75uU7rBPA4Wh1mm9uVWngc8GtrKX"
    )

    console.log(`✅ - Minted NFT: ${nft.address.toString()}`);
    console.log(`     https://explorer.solana.com/address/${nft.address.toString()}`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}`);
}