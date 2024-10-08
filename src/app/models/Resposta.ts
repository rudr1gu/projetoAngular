import { Alunos } from "./Alunos";
import { Professor } from "./Professor";

export interface Resposta {
    id?: number;
    resposta: string;
    forumId: number;
    usuarioId: number;
    aluno?: Alunos;
    professor?: Professor;
    fileName?: string;
    createdAt?: string;
    updatedAt?: Date;
}