import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilKinePage } from './perfil-kine.page';

describe('PerfilKinePage', () => {
  let component: PerfilKinePage;
  let fixture: ComponentFixture<PerfilKinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilKinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilKinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
