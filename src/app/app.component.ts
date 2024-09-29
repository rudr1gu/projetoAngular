import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from './services/login/login-aluno.service';
import { Alunos } from './models/Alunos';
import { Professor } from './models/Professor';
import { UserDataServiceService } from './services/user-data-service.service';
import { LoginProfessorService } from './services/login/login-professor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  isAlunologado: boolean = false;
  isProfessorlogado: boolean = false;

  userData!: Alunos | Professor;
  
  title = 'rede-de-apoio';
  
  constructor(
    private loginAlunoService: LoginAlunoService,
    private loginProfessorService: LoginProfessorService,
    private userDataService: UserDataServiceService
  ) { }
  
  ngOnInit(): void {
    this.isAlunologado = this.loginAlunoService.isAuthenticated()
    this.isProfessorlogado = this.loginProfessorService.isAuthenticated();

    if (this.isAlunologado) {
      this.loginAlunoService.getCurrentUser().subscribe(
        (aluno) => {
          this.userData = aluno as Alunos;
          this.userDataService.updateUserData(this.userData);
          // console.log('Aluno logado', aluno);
        },
        (error) => {
          console.log('Erro ao pegar o aluno logado', error);
        }
      );
    }
    else if (this.loginProfessorService.isAuthenticated()) {
        this.loginProfessorService.getCurrentUser().subscribe(
          (professor) => {
            this.userData = professor as Professor;
            this.userDataService.updateUserData(this.userData);
            // console.log('Professor logado', professor);
          },
          (error) => {
            console.log('Erro ao pegar o professor logado', error);
          }
        );
    } else {
      // console.log('Usuário não está logado');
    }
     
  }
}