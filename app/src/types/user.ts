export type UserDto = {
    id: string;
    fullName: string;
    userName: string;
    email?: string;
    walletPublicKey?: string;
    avatarUrl?: string;
    closedBountiesCount?: number;
    level?: number;
};
