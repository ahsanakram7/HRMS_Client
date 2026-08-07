export interface LoginResponse {
    token: string;
    expiresIn: number;

    user: {
        id: string;
        userName: string;
        email: string;
        fullName: string;
    };
}
