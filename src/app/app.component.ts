import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from './services/login/login-aluno.service';
import { Alunos } from './models/Alunos';
import { UserDataServiceService } from './services/user-data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  islogado: boolean = false;

  userData!: Alunos;
  
  title = 'rede-de-apoio';
  
  constructor(
    private loginService: LoginAlunoService,
    private userDataService: UserDataServiceService
  ) { }
  
  ngOnInit(): void {
    this.islogado = this.loginService.isAuthenticated();

    if(this.islogado){
      this.loginService.getCurrentUser().subscribe(
        (aluno) => {
          this.userData = aluno as Alunos;
          // console.log('userData', this.userData);
          this.userDataService.updateUserData(this.userData);
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