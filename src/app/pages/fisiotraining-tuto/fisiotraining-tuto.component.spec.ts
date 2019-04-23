import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FisiotrainingTutoComponent } from './fisiotraining-tuto.component';

describe('FisiotrainingTutoComponent', () => {
  let component: FisiotrainingTutoComponent;
  let fixture: ComponentFixture<FisiotrainingTutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FisiotrainingTutoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FisiotrainingTutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
