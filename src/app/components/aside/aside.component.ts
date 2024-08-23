import { Component, Input, OnInit} from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent implements OnInit{
  @Input() userData!: Alunos;

  apiUrl = environment.baseApiUrl;
  imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek='

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
