import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEvaluacionesPage } from './ver-evaluaciones.page';

describe('VerEvaluacionesPage', () => {
  let component: VerEvaluacionesPage;
  let fixture: ComponentFixture<VerEvaluacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerEvaluacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEvaluacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
