import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscritorioVisitaPage } from './escritorio-visita.page';

describe('EscritorioVisitaPage', () => {
  let component: EscritorioVisitaPage;
  let fixture: ComponentFixture<EscritorioVisitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscritorioVisitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscritorioVisitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
