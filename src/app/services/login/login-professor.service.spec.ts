import { TestBed } from '@angular/core/testing';

import { LoginProfessorService } from './login-professor.service';

describe('LoginProfessorService', () => {
  let service: LoginProfessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginProfessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
