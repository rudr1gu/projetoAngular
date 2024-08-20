export interface LoginResponse {
    message?: string;
    token: string;
    aluno: {
        id: number;
        nome: string;
        email: string;
    }
}