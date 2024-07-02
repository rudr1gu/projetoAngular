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
  comentarios = [];
  horario = new Date();
 
  constructor() { }
  ngOnInit(): void {
    console.log('feed');
  }
  
}