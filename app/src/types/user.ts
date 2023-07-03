export type UserPayload = {
    id: string;
    fullName: string;
    userName: string;
    email?: string;
    walletPublicKey?: string;
    avatarUrl?: string;
    avatar: File | null;
    skills: string[];
    closedBountiesCount?: number;
    level?: number;
    isAdmin: boolean;
};

export interface UpdateUserFormData {
    fullName: string;
    userName: string;
    walletPublicKey: string;
    avatar: File | null;
  skills: string[];
}
