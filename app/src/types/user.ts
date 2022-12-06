export type UserPayload = {
    id: string;
    fullName: string;
    userName: string;
    email?: string;
    walletPublicKey?: string;
    avatarUrl?: string;
    closedBountiesCount?: number;
    level?: number;
};

export interface UpdateUserFormData {
    fullName: string;
    userName: string;
    walletPublicKey: string;
}
