import { TestBed } from '@angular/core/testing';

import { CadastroAlunosService } from './cadastro-alunos.service';

describe('CadastroAlunosService', () => {
  let service: CadastroAlunosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroAlunosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
