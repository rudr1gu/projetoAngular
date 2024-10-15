import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';
import { Professor } from '../../models/Professor';
import { CadastroAlunosService } from '../../services/cadastro/cadastro-alunos.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit, OnChanges {
  @Input() userData!: Alunos | Professor;

  apiUrl = environment.baseApiUrl;
  imgDefault!: string;
  updateForm!: FormGroup;
  selectedFile!: File;

  constructor(
    private loginService: LoginAlunoService,
    private cadastroService: CadastroAlunosService
  ) {}

  ngOnInit() {
    this.imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';
    
    this.updateForm = new FormGroup({
      img: new FormControl('')
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData'] && this.userData) {
      this.setImage();
    }
  }

  setImage() {
    if (this.userData?.img) {
      this.imgDefault = `${this.apiUrl}uploads/${this.userData.img}`;
    } else {
      this.imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = file;
  }

  updateImg() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('img', this.selectedFile);
  
      this.cadastroService.updateAluno(this.userData.id, formData).subscribe(
        (response) => {
          console.log('Resposta da API:', response); // Verifique a resposta da API
          this.userData.img = (response as any).img;
          this.setImage();
        },
        (error) => {
          console.log('Erro:', error);
        }
      );
    } else {
      console.log('Nenhuma imagem selecionada.');
    }
  }
  

  onSubmit() {
    this.updateImg();
  }

  logout() {
    this.loginService.logout();
  }
}