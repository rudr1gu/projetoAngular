import { Alunos } from "./Alunos";

export interface Resposta {
    id?: number;
    resposta: string;
    forumId: number;
    usuarioId: number;
    aluno?: Alunos;
    createdAt?: string;
    updatedAt?: Date;
}