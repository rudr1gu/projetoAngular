import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alunos } from '../../models/Alunos';
import { environment } from '../../../environments/environment';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root'
})
export class CadastroAlunosService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/alunos`;

  

  constructor(private http: HttpClient) { }

  novoAluno(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  novoProfessor(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.baseApiUrl}api/professores`, formData);
  }

  updateAluno(alunoId: number, formData: FormData): Observable<FormData> {
    return this.http.put<FormData>(`${this.apiUrl}/${alunoId}`, formData);
  }

}
