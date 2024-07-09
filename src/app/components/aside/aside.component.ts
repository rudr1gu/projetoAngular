import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  @Input() userData!: {
    name: string;
    age: number;
    email: string;
    curso: string;
    ra: number;
    rg: number;
    modulo: string;
    periodo: string;
  };

  class = {
    sidebars: 'sidebars',
    container: 'container',
    row:'row',
    col: 'col-md-4 static',
    fotoPerfil: 'fotoPerfil',
    cardPerfil: 'cardPerfil',
    nome:'nome',
    textWhite: 'text-white',
    navFeed: 'navFeed',
  }

  constructor() {

  }

  ngOnInit() {}

}
