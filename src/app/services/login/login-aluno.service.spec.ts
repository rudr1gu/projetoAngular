import { TestBed } from '@angular/core/testing';

import { LoginAlunoService } from './login-aluno.service';

describe('LoginAlunoService', () => {
  let service: LoginAlunoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAlunoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
