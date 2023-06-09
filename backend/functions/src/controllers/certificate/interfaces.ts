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

export interface SendCerficateCustomParams {
    userId: string;
    eventId: string;
    extraData: object;
}

export type SendCerficateParams = SendCerficateCustomParams & SendCerficateDefaultParams


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

interface SendChunkParamsDefault {
    logger: (...p: any[]) => void;
    eventId: string;
}

export type SendChunkParams = SendChunkParamsDefault & SendCerficateDefaultParams

export interface SendCertificateResult {
    userId: string;
    sent: boolean;
}

export interface SendChunkItem {
    userId: string;
    extraData: object;
}