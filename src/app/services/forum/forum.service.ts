import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Forum } from '../../models/Forum';
import { Response } from '../../models/Response';
import { Resposta } from '../../models/Resposta';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/forums`;

  constructor(
    private http: HttpClient,
  ) { }

  createForum(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getAllForums(): Observable<Forum[]> {
    return this.http.get<Forum[]>(this.apiUrl);
  }

  getForum(id: number): Observable<Forum> {
    return this.http.get<Forum>(`${this.apiUrl}/${id}`);
  }

  removeForum(id: number): Observable<Forum> {
    return this.http.delete<Forum>(`${this.apiUrl}/${id}`);
  }

  createResposta(data: Resposta): Observable<Response<Resposta>> {
    const url = `${this.apiUrl}/${data.forumId}/respostas`;
    return this.http.post<Response<Resposta>>(url, data);
  }


}
