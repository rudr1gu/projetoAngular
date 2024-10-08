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
    cursoId?: number;
    genero?: string;
    img?: string;
    // tipo?: string;
    createdAt?: string;
    updatedAt?: string;
}