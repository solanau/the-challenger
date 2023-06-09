export interface SendCertificatesInput {
    eventId: string
}

export interface SendTestCerficateInput {
    eventId: string;
    walletAddress: string;
}

export interface BulkSendCertificateParams {
    eventId: string;
    cluster: string;
    callerId: string;
}

export interface SendTestCerficateParams {
    walletAddress: string;
    eventId: string;
    cluster: string;
    callerId: string;
}

export interface SendCerficateDefaultParams {
    cluster: string;
    candyMachineAddress: string;
    collectionUpdateAuthority: string;
    resultCollectionFirebase: string;
}

export type SendCerficateParams = {
    userId: string;
    eventId: string;
    extraData: object;
} & SendCerficateDefaultParams


export interface ParticipationCertificateEntry {
    userId: string;
    nftAddress: string;
    signature: string;
    extraData: object;
}

export interface ParticipationNFTNode {
    minChallengesToCertificate: number,
    maxUsersToCertificate: number,
    candyMachineAddress: string,
    collectionUpdateAuthority: string,
}

export type SendChunkParams = {
    logger: (...p: any[]) => void;
    eventId: string;
} & SendCerficateDefaultParams

export interface SendCertificateResult {
    userId: string;
    sent: boolean;
}

export interface SendChunkItem {
    userId: string;
    extraData: object;
}