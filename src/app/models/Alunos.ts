export interface Alunos {
    id: number;
    nome: string;
    email: string;
    senha?: string;
    rg?: string;
    cpf?: string;
    matricula?: string;
    data_nascimento?: string;
    telefone?: string;
    curso?: string;
    genero?: string;
    img?: string;
    createdAt?: string | null | undefined;
    updatedAt?: string;
}