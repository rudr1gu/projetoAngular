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
    turma?: string;
    genero?: string;
    createdAt?: string | null | undefined;
    updatedAt?: string;
}