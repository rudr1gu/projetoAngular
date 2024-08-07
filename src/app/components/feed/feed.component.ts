import { Component, OnInit, Input } from '@angular/core';
import { Postagem } from '../../models/Postagem';
import { RespostaPost } from '../../models/RespostaPost';
import { FeedService } from '../../services/feed/feed.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  @Input() userData!: {
    name: string,
    age: number,
    email: string,
    curso: string,
    ra: number,
    rg: number,
    modulo: string,
    periodo: string
  }

  currentPostId: number | null = null;
  postagens: Postagem[] = [];
  resPost: RespostaPost[] = []
 
  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getAllPostagens().subscribe(items => {
      const postagens = items.map(item => {
        return {
          id: item.id,
          titulo: item.titulo,
          conteudo: item.conteudo,
          autor: item.autor,
          imagem: item.imagem,
          tags: item.tags,
          qntd_estrelas: item.qntd_estrelas,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        }
      });

      this.postagens = postagens;

    });
  }

  // toggleComment(postagemId: number):void{
  //   if(this.currentPostId === postagemId){
  //   this.currentPostId = null;
  //   } else {
  //   this.currentPostId = postagemId;
  //   }
  // }
  
  adicionarPostagem(){
    // const postagemInput = document.getElementById('post') as HTMLInputElement;
    // const postagem = postagemInput.value;
    // this.feedService.novaPostagem(this.postagens, postagem);
    // postagemInput.value = '';
  }

  // removerPostagem(){
  //   const index = this.postagens.length - 1;
  //   this.feedService.remover(this.postagens, index);
  // }

  // adicionarResposta(postagemId: number, event: Event){
  //   event.preventDefault();
  //   const KeyboardEvent = event as KeyboardEvent;
  //   const respostaInput = KeyboardEvent.target as HTMLInputElement;
  //   const resposta = respostaInput.value;
  //   this.feedService.novaResposta(this.postagens, postagemId, resposta);
  //   respostaInput.value = '';
  // }

  // removerResposta(postagemId: number, respostaId: number){
  //   this.feedService.removerResposta(this.postagens, postagemId, respostaId);
  // }
}