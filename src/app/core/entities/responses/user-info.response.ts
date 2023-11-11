export interface UserInfoResponse {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    estado?: string;
    deletedAt?: Date;
}