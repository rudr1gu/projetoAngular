import { RespostaPost } from "./RespostaPost";

export interface Postagem {
    id: number;
    postagem: string;
    autor: string;
    data: Date;
    resposta: RespostaPost[];
}