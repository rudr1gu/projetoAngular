import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Alunos } from '../../models/Alunos';
import { Response } from '../../models/Response';




@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/alunos`;

  constructor(
    private http: HttpClient,
  ) { }

  getAllAlunos(): Observable<Response<Alunos[]>> {
    return this.http.get<Response<Alunos[]>>(this.apiUrl);
  }
}
