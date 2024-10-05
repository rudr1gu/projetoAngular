import { Alunos } from './Alunos';
import { Materias } from './Materias';
import { Resposta } from './Resposta';
import { Tag } from './Tag';

export interface Forum {
    id: number;
    titulo: string;
    descricao: string;
    alunoId: number;
    materiaId: number;
    aluno: Alunos;
    materia: Materias;
    fileName?: string;
    respostas?: Resposta[];
    tags?: Tag[];
    createdAt?: string;
    updatedAt?: Date;
}