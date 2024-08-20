import { Component, Input, OnInit} from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
import { Alunos } from '../../models/Alunos';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  @Input() userData!: Alunos;

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

  constructor(private loginService: LoginAlunoService) {
  }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
  }

}
