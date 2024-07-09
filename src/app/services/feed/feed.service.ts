import { Injectable } from '@angular/core';
import { Postagem } from '../../Postagem';

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
}
