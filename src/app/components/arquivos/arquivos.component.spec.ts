import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivosComponent } from './arquivos.component';

describe('ArquivosComponent', () => {
  let component: ArquivosComponent;
  let fixture: ComponentFixture<ArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArquivosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
