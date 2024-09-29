import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alunos } from '../models/Alunos';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  private UserDataSource = new BehaviorSubject<Alunos | Professor |null>(null);
  currentUserData = this.UserDataSource.asObservable();

  constructor() { }

  updateUserData(userData: Alunos | Professor): void {
    this.UserDataSource.next(userData);
  }
}
