import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerEvaluacionBimensualPage } from './hacer-evaluacion-bimensual.page';

describe('HacerEvaluacionBimensualPage', () => {
  let component: HacerEvaluacionBimensualPage;
  let fixture: ComponentFixture<HacerEvaluacionBimensualPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HacerEvaluacionBimensualPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerEvaluacionBimensualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
