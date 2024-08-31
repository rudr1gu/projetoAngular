export interface Professor {
    id: number;
    nome: string;
    email: string;
    senha?: string;
    rg?: string;
    cpf?: string;
    matricula?: string;
    data_nascimento?: string;
    telefone?: string;
    cursoId?: number;
    genero?: string;
    img?: string;
    createdAt?: string;
    updatedAt?: string;
}