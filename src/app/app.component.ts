import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from './services/login/login-aluno.service';
import {authGuard} from './auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  islogado: boolean = false;
  
  constructor(private loginService: LoginAlunoService,
  
  ) { }
  
  ngOnInit(): void {
    this.islogado = this.loginService.isAuthenticated();   
  }

  userData = {
    name: 'José Pedro',
    age: 20,
    email: 'zepedro@etec.sp.gov.br',
    curso: 'Tec. Desenvolvimento de Sistemas',
    ra: 123,
    rg: 123456789,
    modulo: 'Segundo Semestres',
    periodo: 'Noturno'
  };
  title = 'rede-de-apoio';
}
