import { Alunos } from './Alunos';
import { Materias } from './Materias';
import { Professor } from './Professor';
import { Resposta } from './Resposta';
import { Tag } from './Tag';

export interface Forum {
    id: number;
    titulo: string;
    descricao: string;
    alunoId?: number;
    professorId?: number;
    materiaId: number;
    aluno?: Alunos;
    professor?: Professor;
    materia: Materias;
    fileName?: string;
    respostas?: Resposta[];
    tags?: Tag[];
    createdAt?: string;
    updatedAt?: Date;
}