import { TestBed } from '@angular/core/testing';

import { DriverGuideRatingService } from './driver-guide-rating.service';

describe('DriverGuideRatingService', () => {
  let service: DriverGuideRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverGuideRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
