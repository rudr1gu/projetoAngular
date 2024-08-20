import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginAlunoService {
  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}api/alunos/login`;

  //Estado reativo que vai armazenar o token do usuário
  private currentUserSubject: BehaviorSubject<Alunos | null> = new BehaviorSubject<Alunos | null>(null);
  public currentUser$: Observable<Alunos | null> = this.currentUserSubject.asObservable();

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

  logout(): void {
    if(typeof window !== 'undefined'){
      localStorage.removeItem('token');
      this.currentUserSubject.next(null);
      window.location.reload();
    }
  }

  setUserData(aluno: Alunos, token: string): void {
    localStorage.setItem('token', token);
    this.currentUserSubject.next(aluno);
  }

  getAlunoById(id: number): Observable<Alunos> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const apiUrl = `${this.baseApiUrl}api/alunos/${id}`;
    return this.httpClient.get<Alunos>(apiUrl, { headers });
  }

  getCurrentUser(): Observable<Alunos | null> {
    const token = localStorage.getItem('token');
    if(token){
      const alunoId =parseInt(token)
      return this.getAlunoById(alunoId);
    }

    return this.currentUser$;
  }
}