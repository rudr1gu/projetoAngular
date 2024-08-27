import { Component, OnInit } from '@angular/core';
import { Alunos } from '../../models/Alunos';
import { CadastroAlunosService } from '../../services/cadastro/cadastro-alunos.service';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
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
  
  constructor(
    private alunosService: CadastroAlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alunosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      rg: new FormControl(''),
      cpf: new FormControl(''),
      matricula: new FormControl(''),
      data_nascimento: new FormControl(''),
      telefone: new FormControl(''),
      cursoId: new FormControl(''),
      genero: new FormControl(''),
      img: new FormControl(null)
    });
  }

  async onSubmit(){
    if(this.alunosForm.invalid) {
      alert('Preencha todos os campos');
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.alunosForm.get('nome')!.value);
    formData.append('email', this.alunosForm.get('email')!.value);
    formData.append('senha', this.alunosForm.get('senha')!.value);

    if(this.selectedFile){
      formData.append('img', this.selectedFile);
    }



    this.alunosService.novoAluno(formData).subscribe((response) => {
      console.log(response);
      alert('Aluno cadastrado com sucesso');
      this.alunosForm.reset();
      this.router.navigate(['/login']);
    },
    (error) => {
      console.log(error);
      alert('Erro ao cadastrar aluno');

    });
  }

  onFileSelected(event: Event):void{
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      this.selectedFile = input.files[0];
      console.log('arquivo selecionado',this.selectedFile);
    }


  }

}
