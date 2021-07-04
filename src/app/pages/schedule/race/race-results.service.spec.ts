import { TestBed } from '@angular/core/testing';

import { RaceResultsService } from './race-results.service';

describe('RaceResultsService', () => {
  let service: RaceResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaceResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
