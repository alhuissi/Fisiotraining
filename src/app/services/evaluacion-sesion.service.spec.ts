import { TestBed } from '@angular/core/testing';

import { EvaluacionSesionService } from './evaluacion-sesion.service';

describe('EvaluacionSesionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluacionSesionService = TestBed.get(EvaluacionSesionService);
    expect(service).toBeTruthy();
  });
});
