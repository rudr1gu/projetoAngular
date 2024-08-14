import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
import { Alunos } from '../../models/Alunos';


@Component({
  selector: 'app-login-aluno',
  templateUrl: './login-aluno.component.html',
  styleUrl: './login-aluno.component.css'
})
export class LoginAlunoComponent implements OnInit {
  constructor(private loginService: LoginAlunoService) { }

  alunos: Alunos[] = [];

  ngOnInit(): void {
  }

  Login(): void {
    let email = (<HTMLInputElement>document.getElementById('email')).value;
    let senha = (<HTMLInputElement>document.getElementById('senha')).value;
    this.loginService.logar(email, senha)
  }

}
