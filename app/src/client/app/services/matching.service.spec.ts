import { TestBed, inject } from '@angular/core/testing';

import { MatchingService } from './matching.service';

describe('MatchingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchingService]
    });
  });

  it('should be created', inject([MatchingService], (service: MatchingService) => {
    expect(service).toBeTruthy();
  }));
});
