import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginAlunoService {
  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}api/alunos`;

  constructor(private httpClient: HttpClient) { }
 

  logar(email: string, senha: string): void {
    console.log(email, senha);
  }

}
