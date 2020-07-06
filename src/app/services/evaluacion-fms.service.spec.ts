import { TestBed } from '@angular/core/testing';

import { EvaluacionFmsService } from './evaluacion-fms.service';

describe('EvaluacionFmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EvaluacionFmsService = TestBed.get(EvaluacionFmsService);
    expect(service).toBeTruthy();
  });
});
