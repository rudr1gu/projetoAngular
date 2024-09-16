import { Tag } from "./Tag";

export interface Materias {
    id: number;
    nome: string;
    descricao: string;
    cursoId: number;
    tags: Tag[];
    createdAt?: string;
    updatedAt?: Date;
}