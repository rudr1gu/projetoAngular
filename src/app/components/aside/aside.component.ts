import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LoginAlunoService } from '../../services/login/login-aluno.service';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';
import { Professor } from '../../models/Professor';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})

export class AsideComponent implements OnInit, OnChanges {
  @Input() userData!: Alunos | Professor;

  apiUrl = environment.baseApiUrl;
  imgDefault!: string;

  constructor(private loginService: LoginAlunoService) {}

  ngOnInit() {
    // Inicializa imgDefault com uma imagem padrão
    this.imgDefault = 'https://media.istockphoto.com/id/1495088043/pt/vetorial/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=S7d8ImMSfoLBMCaEJOffTVua003OAl2xUnzOsuKIwek=';
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

  logout() {
    this.loginService.logout();
  }
}