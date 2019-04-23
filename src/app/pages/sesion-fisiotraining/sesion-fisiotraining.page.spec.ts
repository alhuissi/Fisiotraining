import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionFisiotrainingPage } from './sesion-fisiotraining.page';

describe('SesionFisiotrainingPage', () => {
  let component: SesionFisiotrainingPage;
  let fixture: ComponentFixture<SesionFisiotrainingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SesionFisiotrainingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SesionFisiotrainingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
