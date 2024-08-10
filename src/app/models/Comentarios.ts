export interface Comentarios {
    id: number;
    autor: string;
    conteudo: string;
    postagemId: number;
    qntd_estrelas: number;
    createdAt: string | null | undefined;
    updatedAt: string;
}