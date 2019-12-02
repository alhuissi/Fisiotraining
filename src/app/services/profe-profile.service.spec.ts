import { TestBed } from '@angular/core/testing';

import { ProfeProfileService } from './profe-profile.service';

describe('ProfeProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfeProfileService = TestBed.get(ProfeProfileService);
    expect(service).toBeTruthy();
  });
});
