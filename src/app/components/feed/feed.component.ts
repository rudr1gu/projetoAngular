import { Component, OnInit, Input } from '@angular/core';
import { Postagem } from '../../models/Postagem';
import { RespostaPost } from '../../models/RespostaPost';
import { FeedService } from '../../services/feed/feed.service';

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

  showComment = false;

  postagens: Postagem[] = [];
  resPost: RespostaPost[] = []
 
  constructor(private feedService: FeedService) {}

  ngOnInit(): void {}

  comment(){
    this.showComment = !this.showComment;
  }
  
  adicionarPostagem(){
    const postagemInput = document.getElementById('post') as HTMLInputElement;
    const postagem = postagemInput.value;
    this.feedService.novaPostagem(this.postagens, postagem);
    postagemInput.value = '';
  }

  removerPostagem(){
    const index = this.postagens.length - 1;
    this.feedService.remover(this.postagens, index);
  }

  adicionarResposta(){
    const respostaInput = document.getElementById('resposta') as HTMLInputElement;
    const resposta = respostaInput.value;
    this.feedService.novaResposta(this.resPost, resposta);
    respostaInput.value = '';
  }
}