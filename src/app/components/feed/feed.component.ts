import { Component, OnInit, Input } from '@angular/core';
import { Postagem } from '../../Postagem';
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

  postagens: Postagem[] = [
    {
      postagem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.',
      autor: 'José',
      data: new Date()
    },  
]
 
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
}