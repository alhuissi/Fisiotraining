import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirEvaluacionDiariaPage } from './abrir-evaluacion-diaria.page';

describe('AbrirEvaluacionDiariaPage', () => {
  let component: AbrirEvaluacionDiariaPage;
  let fixture: ComponentFixture<AbrirEvaluacionDiariaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirEvaluacionDiariaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirEvaluacionDiariaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
