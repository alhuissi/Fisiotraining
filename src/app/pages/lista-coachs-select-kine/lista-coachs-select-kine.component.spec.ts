import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCoachsSelectKineComponent } from './lista-coachs-select-kine.component';

describe('ListaCoachsSelectKineComponent', () => {
  let component: ListaCoachsSelectKineComponent;
  let fixture: ComponentFixture<ListaCoachsSelectKineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaCoachsSelectKineComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCoachsSelectKineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
