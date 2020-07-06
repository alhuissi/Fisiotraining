import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerEvaluacionDiariaFmsPage } from './hacer-evaluacion-diaria-fms.page';

describe('HacerEvaluacionDiariaFmsPage', () => {
  let component: HacerEvaluacionDiariaFmsPage;
  let fixture: ComponentFixture<HacerEvaluacionDiariaFmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerEvaluacionDiariaFmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerEvaluacionDiariaFmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
