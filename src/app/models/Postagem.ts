import { Comentarios } from "./Comentarios";

export interface Postagem {
    id?: number;
    titulo: string;
    conteudo: string;
    autor: string;
    imagem?: string;
    tags?: string;
    qntd_estrelas?: number;
    comentarios?: Comentarios[];
    createdAt?: string | null | undefined;
    updatedAt?: string;
}