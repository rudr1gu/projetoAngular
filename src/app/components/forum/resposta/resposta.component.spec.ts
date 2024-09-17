import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespostaComponent } from './resposta.component';

describe('RespostaComponent', () => {
  let component: RespostaComponent;
  let fixture: ComponentFixture<RespostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RespostaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RespostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
