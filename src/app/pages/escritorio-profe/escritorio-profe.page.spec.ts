import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscritorioProfePage } from './escritorio-profe.page';

describe('EscritorioProfePage', () => {
  let component: EscritorioProfePage;
  let fixture: ComponentFixture<EscritorioProfePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscritorioProfePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscritorioProfePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
