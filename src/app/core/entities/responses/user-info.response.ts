export interface UserInfoResponse {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    documento: string;
    email: string;
    estado?: string;
    deletedAt?: Date;
}