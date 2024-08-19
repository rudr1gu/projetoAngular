import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from './services/login/login-aluno.service';
import { Alunos } from './models/Alunos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  islogado: boolean = false;

  userData!: Alunos | null; //Alunos | null é um tipo de dado que pode ser Alunos ou null
  
  title = 'rede-de-apoio';
  
  constructor(private loginService: LoginAlunoService,) { }
  
  ngOnInit(): void {
    this.islogado = this.loginService.isAuthenticated();

    if(this.islogado){
      this.loginService.getCurrentUser().subscribe(
        (aluno) => {
          this.userData = aluno || null;
          console.log('userData', this.userData);
        },
        (error) => {
          console.log('erro ao pegar o usuário logado', error);
        }
      );
    } else {
      console.log('usuário não está logado');
    }
    
  }
}