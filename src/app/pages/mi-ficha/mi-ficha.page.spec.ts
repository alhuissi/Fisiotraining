import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiFichaPage } from './mi-ficha.page';

describe('MiFichaPage', () => {
  let component: MiFichaPage;
  let fixture: ComponentFixture<MiFichaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiFichaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiFichaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
