import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroComponent } from './filtro.component';

describe('FiltroComponent', () => {
  let component: FiltroComponent;
  let fixture: ComponentFixture<FiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
