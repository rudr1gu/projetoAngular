import { RespostaPost } from "./RespostaPost";

export interface Postagem {
    id?: number;
    titulo: string;
    conteudo: string;
    autor: string;
    imagem?: string;
    tags?: string;
    qntd_estrelas?: number;
    createdAt?: Date;
    updatedAt?: Date;
}