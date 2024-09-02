import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../../models/LoginResponse';
import { Professor } from '../../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class LoginProfessorService {
  baseApiUrl = environment.baseApiUrl;
  apiUrl = `${this.baseApiUrl}api/professor/login`;

  private currentUserSubject = new BehaviorSubject<Professor | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(credencial: any): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.apiUrl, credencial);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  setUserData(professor: Professor, token: string): void {
    localStorage.setItem('token', token);
    this.currentUserSubject.next(professor);
  }

  getProfessorById(id: number): Observable<Professor> {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    const apiUrl = `${this.baseApiUrl}api/professor/${id}`;
    return this.httpClient.get<Professor>(apiUrl, { headers });
  }

  getCurrentUser(): Observable<Professor | null> {
    const token = localStorage.getItem('token');
    if (token) {
      const professorId = parseInt(token);
      return this.getProfessorById(professorId);
    }

    return this.currentUser$;
  }
}