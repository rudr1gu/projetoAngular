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
  
  constructor(
    private alunosService: CadastroAlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alunosForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      senha: new FormControl('', Validators.required),
      rg: new FormControl(''),
      cpf: new FormControl(''),
      matricula: new FormControl(''),
      data_nascimento: new FormControl(''),
      telefone: new FormControl(''),
      curso: new FormControl('Desenvolvimento de Sistemas'),
      genero: new FormControl(''),
      img: new FormControl('')
    });
  }

  async onSubmit(){
    if(this.alunosForm.invalid) {
      alert('Preencha todos os campos');
      return;
    }

    this.alunosService.novoAluno(this.alunosForm.value).subscribe((response) => {
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

onFileSelected(event: any){
  const file: File = event.target.files[0];

  this.alunosForm.patchValue({img: file});
}

}
