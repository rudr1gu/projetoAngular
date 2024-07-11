import { Injectable } from '@angular/core';
import { Postagem } from '../../models/Postagem';
import { RespostaPost } from '../../models/RespostaPost';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor() { }
  novaPostagem(postagens: Postagem[], postagem: string):void {
    const postagemObj: Postagem = {
      postagem: postagem,
      autor: 'Default',
      data: new Date(),
      id: postagens.length,
      resposta: []
    }

    postagens.push(postagemObj)
  }

  remover(postagens: Postagem[], id: number):void {
    const index =  postagens.findIndex(postagem => postagem.id === id);
    if(index !== -1){
      postagens.splice(index, 1);
    }

  }

  novaResposta(postagens: Postagem[],postagemId: number, resposta: string):void {
    const postagem = postagens.find(p => p.id === postagemId);
    if(postagem){
      const respostaObj: RespostaPost = {
        id: postagem.resposta.length,
        resposta: resposta,
        autor: 'Default',
        data: new Date()
      }
    postagem.resposta.push(respostaObj);
    }  
  }

}
