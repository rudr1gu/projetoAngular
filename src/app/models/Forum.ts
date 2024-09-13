import { Resposta } from './Resposta';

export interface Forum {
    id: number;
    titulo: string;
    descricao: string;
    alunoId: number;
    materiaId: number;
    respostas: Resposta[];
    createdAt?: string;
    updatedAt?: Date;
}