import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
import { LoginProfessorService } from '../../services/login/login-professor.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-aluno',
  templateUrl: './login-aluno.component.html',
  styleUrl: './login-aluno.component.css'
})
export class LoginAlunoComponent implements OnInit {
  credencial = {
    email: '',
    senha: '',
    tipo: ''
  }

  loginForm!: FormGroup;

  constructor(
    private loginService: LoginAlunoService,
    private loginProfessorService: LoginProfessorService,
    private router: Router,
  ) { }
  

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required])
    });
  }

  async onLogin(){
    this.credencial.email = this.loginForm.get('email')?.value;
    this.credencial.senha = this.loginForm.get('senha')?.value;
    this.credencial.tipo = this.loginForm.get('tipo')?.value;
    
    if(this.credencial.tipo === 'aluno'){
      this.loginAluno();
    }else if(this.credencial.tipo === 'professor'){
      this.loginProfessor();
    }else{
      alert('selecione um tipo de usuário');
    }
  }

  private loginAluno(){
    this.loginService.login(this.credencial).subscribe(
      (response) => {
        if(!response.token){
          alert('verifique suas credenciais');
          return;
        }

        this.loginService.setUserData(response.user, response.token);
        window.location.reload();
        this.router.navigate(['/']);
          
      },
      (error) => {
        console.log('erro ao fazer login',error);
        alert('erro ao fazer login');
      }
    );
  }

  private loginProfessor(){
    this.loginProfessorService.login(this.credencial).subscribe(
      (response) => {
        if(!response.token){
          alert('verifique suas credenciais');
          return;
        }

        this.loginProfessorService.setUserData(response.user, response.token);
        window.location.reload();
        this.router.navigate(['/']);
          
      },
      (error) => {
        console.log('erro ao fazer login',error);
        alert('erro ao fazer login');
      }
    );
  }
  
}