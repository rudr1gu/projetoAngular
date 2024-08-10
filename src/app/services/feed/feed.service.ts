import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Postagem } from '../../models/Postagem';
import { Comentarios } from '../../models/Comentarios';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root'
})

export class FeedService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/postagems`;


  constructor(private http: HttpClient) { }

  novaPostagem(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getAllPostagens(): Observable<Response <Postagem[]>> {
    return this.http.get<Response<Postagem[]>>(this.apiUrl);
  }

  getPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${this.apiUrl}/${id}`);
  }

  remover(id: number): Observable<Postagem> {
    return this.http.delete<Postagem>(`${this.apiUrl}/${id}`);
  }

  //comentarios

  addComentario(data: Comentarios): Observable<Response<Comentarios>> {
    const url = `${this.apiUrl}/${data.postagemId}/comentarios`;
    return this.http.post<Response<Comentarios>>(url, data);
  }


}
