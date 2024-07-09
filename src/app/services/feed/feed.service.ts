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
      data: new Date()
    }

    postagens.push(postagemObj)
  }

  remover(postagens: Postagem[], index: number):void {
    postagens.splice(index, 1);
  }

  novaResposta(respostas: RespostaPost[], resposta: string):void {
    const respostaObj: RespostaPost = {
      resposta: resposta,
      autor: 'Default',
      data: new Date()
    }

    respostas.push(respostaObj);
  }

}
