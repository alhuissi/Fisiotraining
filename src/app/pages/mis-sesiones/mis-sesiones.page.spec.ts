import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisSesionesPage } from './mis-sesiones.page';

describe('MisSesionesPage', () => {
  let component: MisSesionesPage;
  let fixture: ComponentFixture<MisSesionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisSesionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisSesionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
