import { Component, OnInit } from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
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
    senha: ''
  }

  loginForm!: FormGroup;

  constructor(private loginService: LoginAlunoService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required])
    });
  }

  async onLogin(){
    this.credencial.email = this.loginForm.get('email')?.value;
    this.credencial.senha = this.loginForm.get('senha')?.value;
    
    this.loginService.login(this.credencial).subscribe(
      (response) => {
        if(!response.token){
          alert('verifique suas credenciais');
          return;
        }

        localStorage.setItem('token', response.token);
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