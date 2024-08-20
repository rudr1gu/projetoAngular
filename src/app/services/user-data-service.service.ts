import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alunos } from '../models/Alunos';

@Injectable({
  providedIn: 'root'
})
export class UserDataServiceService {
  private UserDataSource = new BehaviorSubject<Alunos | null>(null);
  currentUserData = this.UserDataSource.asObservable();

  constructor() { }

  updateUserData(userData: Alunos): void {
    this.UserDataSource.next(userData);
  }
}
