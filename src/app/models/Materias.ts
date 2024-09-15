import { Tag } from "./Tag";

export interface Materias {
    id: number;
    nome: string;
    descricao: string;
    tags: Tag[];
    createdAt?: string;
    updatedAt?: Date;
}