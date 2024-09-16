import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Materias } from '../../models/Materias';


@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/materias`;
  
  constructor(
    private http: HttpClient,
  ) {}

  getAllMaterias(): Observable<Materias[]> {
    return this.http.get<Materias[]>(this.apiUrl);
  }
}
