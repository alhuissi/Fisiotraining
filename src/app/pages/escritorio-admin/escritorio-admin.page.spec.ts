import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscritorioAdminPage } from './escritorio-admin.page';

describe('EscritorioAdminPage', () => {
  let component: EscritorioAdminPage;
  let fixture: ComponentFixture<EscritorioAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscritorioAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscritorioAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
