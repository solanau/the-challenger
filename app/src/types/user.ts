export type CanCreateStatus = 'approved' | 'denied' | 'pending';
export type CanCreateRequested = 'Yes' | 'No';

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

export interface SetUserPayload {
    fullName: string;
    userName: string;
    walletPublicKey?: string;
    message?: string;
    signature?: string;
}

export interface UpdateUserFormData {
    fullName: string;
    userName: string;
    walletPublicKey?: string;
    message?: string;
    signature?: string;
}
