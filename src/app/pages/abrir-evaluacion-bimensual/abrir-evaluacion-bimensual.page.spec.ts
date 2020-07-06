import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirEvaluacionBimensualPage } from './abrir-evaluacion-bimensual.page';

describe('AbrirEvaluacionBimensualPage', () => {
  let component: AbrirEvaluacionBimensualPage;
  let fixture: ComponentFixture<AbrirEvaluacionBimensualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbrirEvaluacionBimensualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbrirEvaluacionBimensualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
