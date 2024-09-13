import { Respostas } from "./Resposta"; 

export interface Forum{
    id: number;
    titulo: string;
    descricao: string;
    alunoId: number;
    materiaId: number;
    resposta: Respostas[];
    createdAt: string;
    updatedAt: string;
}