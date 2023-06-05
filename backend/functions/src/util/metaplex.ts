import { Metaplex, bundlrStorage, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";


export const mintToUser = async (metaplex: Metaplex, keypair: Keypair, userAddress: string, candyMachineAddress: string, collectionUpdateAuthority: string) => {

    const candyMachine = await metaplex
        .candyMachines()
        .findByAddress({ address: new PublicKey(candyMachineAddress) });

    return metaplex.candyMachines().mint({
        candyMachine,
        owner: new PublicKey(userAddress),
        collectionUpdateAuthority: new PublicKey(collectionUpdateAuthority)
    }, { commitment: 'finalized', payer: keypair })
}

export const initializeMetaplex = (cluster: string, keypair: Keypair) => {
    const connection = new Connection(cluster);
    const metaplaex = Metaplex.make(connection)
        .use(keypairIdentity(keypair))
    if (cluster == clusterApiUrl('devnet')) {
        return metaplaex.use(bundlrStorage({
            address: 'https://devnet.bundlr.network',
        }));
    } else {
        return metaplaex
    }

}
