import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginAlunoService {
  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}api/alunos/login`;

  constructor(private httpClient: HttpClient) { }
 
  isAuthenticated(): boolean {
    if(typeof window !== 'undefined' && localStorage.getItem('token')){
      return true;
    }
    return false; 
  }

  login(credencial: any): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiUrl, credencial);
  }

}
