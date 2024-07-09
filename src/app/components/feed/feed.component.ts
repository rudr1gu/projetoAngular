import { Component, OnInit, Input } from '@angular/core';

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

  postagens = [
    {postagem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui.',
    autor: 'José',
    data: new Date()
    },  
]
 
  constructor() { }
  ngOnInit(): void {
    console.log('feed');
  }

  comment(){
    this.showComment = !this.showComment;
  }
  
  addPostagem(){
    let post = document.getElementById('post') as HTMLInputElement;
    this.postagens.push({
      postagem: post.value,
      autor: 'Default',
      data: new Date()
    })
  }
}