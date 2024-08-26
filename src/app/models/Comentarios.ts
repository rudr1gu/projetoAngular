export interface Comentarios {
    id: number;
    autor: string;
    imgAutor?: string;
    conteudo: string;
    postagemId: number;
    qntd_estrelas: number;
    createdAt: string | null | undefined;
    updatedAt: string;
}