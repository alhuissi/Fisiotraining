import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscritorioClientePage } from './escritorio-cliente.page';

describe('EscritorioClientePage', () => {
  let component: EscritorioClientePage;
  let fixture: ComponentFixture<EscritorioClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscritorioClientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscritorioClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
