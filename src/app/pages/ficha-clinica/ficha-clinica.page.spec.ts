import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinicaPage } from './ficha-clinica.page';

describe('FichaClinicaPage', () => {
  let component: FichaClinicaPage;
  let fixture: ComponentFixture<FichaClinicaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaClinicaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaClinicaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
