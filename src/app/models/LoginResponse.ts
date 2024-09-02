export interface LoginResponse {
    message?: string;
    token: string;
    user: {
        id: number;
        nome: string;
        email: string;
    }
}