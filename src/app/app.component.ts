import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from './services/login/login-aluno.service';
import {authGuard} from './auth.guard';
import { Alunos } from './models/Alunos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  islogado: boolean = false;

  userData!: Alunos;
  
  title = 'rede-de-apoio';
  
  constructor(private loginService: LoginAlunoService,
  
  ) { }
  
  ngOnInit(): void {
    this.islogado = this.loginService.isAuthenticated();
  }


}
