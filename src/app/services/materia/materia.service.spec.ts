import { TestBed } from '@angular/core/testing';

import { MateriaService } from './materia.service';

describe('MateriaService', () => {
  let service: MateriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
