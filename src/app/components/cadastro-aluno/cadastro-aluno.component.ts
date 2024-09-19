import { Component, OnInit } from '@angular/core';
import { Alunos } from '../../models/Alunos';
import { CadastroAlunosService } from '../../services/cadastro/cadastro-alunos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrl: './cadastro-aluno.component.css'
})
export class CadastroAlunoComponent implements OnInit {
  alunos: Alunos[] = [];
  alunosForm!: FormGroup;
  selectedFile?: File;

  showPassword: boolean = false;
  showPasswordConfirmation: boolean = false;
  
  constructor(
    private alunosService: CadastroAlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alunosForm = new FormGroup({
      tipo: new FormControl('selecione', Validators.required),  // Adicionando o tipo ao formulário
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      curso_id: new FormControl('1'), // Ajustando o nome para ser consistente com o HTML
      img: new FormControl(null)
    });
  }

  async onSubmit() {
    if (this.alunosForm.invalid) {
      alert('Preencha todos os campos');
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.alunosForm.get('nome')!.value);
    formData.append('email', this.alunosForm.get('email')!.value);
    formData.append('senha', this.alunosForm.get('senha')!.value);
    formData.append('curso_id', this.alunosForm.get('curso_id')!.value); // Adiciona curso_id ao formData

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    const tipo = this.alunosForm.get('tipo')!.value;

    if (tipo === 'aluno') {
      this.alunosService.novoAluno(formData).subscribe(
        (response) => {
          console.log(response);
          alert('Aluno cadastrado com sucesso');
          this.alunosForm.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          alert('Erro ao cadastrar aluno');
        }
      );
    } else if (tipo === 'professor') {
      this.alunosService.novoProfessor(formData).subscribe(
        (response) => {
          console.log(response);
          alert('Professor cadastrado com sucesso');
          this.alunosForm.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          alert('Erro ao cadastrar professor');
        }
      );
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Arquivo selecionado', this.selectedFile);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordConfirmation() {
    this.showPasswordConfirmation = !this.showPasswordConfirmation;
  }
}
