import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Postagem } from '../../models/Postagem';
import { RespostaPost } from '../../models/RespostaPost';

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

  getAllPostagens(): Observable<Postagem[]> {
    return this.http.get<Postagem[]>(this.apiUrl);
  }

  getPostagem(id: number): Observable<Postagem> {
    return this.http.get<Postagem>(`${this.apiUrl}/${id}`);
  }

  remover(id: number): Observable<Postagem> {
    return this.http.delete<Postagem>(`${this.apiUrl}/${id}`);
  }

  // novaResposta(postagens: Postagem[],postagemId: number, resposta: string):void {
  //   const postagem = postagens.find(p => p.id === postagemId);
  //   if(postagem){
  //     const respostaObj: RespostaPost = {
  //       id: postagem.resposta.length,
  //       resposta: resposta,
  //       autor: 'Default',
  //       data: new Date()
  //     }
  //   postagem.resposta.push(respostaObj);
  //   }  
  // }

  // removerResposta(postagens: Postagem[], postagemId: number, respostaId: number):void {
  //   const postagem = postagens.find(p => p.id === postagemId);
  //   if(postagem){
  //     const index = postagem.resposta.findIndex(r => r.id === respostaId);
  //     if(index !== -1){
  //       postagem.resposta.splice(index, 1);
  //     }
  //   }
  // }

}
