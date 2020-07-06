import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilStatsPage } from './perfil-stats.page';

describe('PerfilStatsPage', () => {
  let component: PerfilStatsPage;
  let fixture: ComponentFixture<PerfilStatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilStatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilStatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
