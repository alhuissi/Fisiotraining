import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaClinica2Page } from './ficha-clinica2.page';

describe('FichaClicnica2Page', () => {
  let component: FichaClinica2Page;
  let fixture: ComponentFixture<FichaClinica2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaClinica2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaClinica2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
