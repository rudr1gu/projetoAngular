import { Alunos } from './Alunos';
import { Materias } from './Materias';
import { Resposta } from './Resposta';

export interface Forum {
    id: number;
    titulo: string;
    descricao: string;
    alunoId: number;
    materiaId: number;
    aluno: Alunos;
    materia: Materias;
    respostas?: Resposta[];
    createdAt?: string;
    updatedAt?: Date;
}