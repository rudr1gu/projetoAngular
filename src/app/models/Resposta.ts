import { Alunos } from "./Alunos";

export interface Resposta {
    id?: number;
    resposta: string;
    forumId: number;
    usuarioId: number;
    aluno?: Alunos;
    fileName?: string;
    createdAt?: string;
    updatedAt?: Date;
}