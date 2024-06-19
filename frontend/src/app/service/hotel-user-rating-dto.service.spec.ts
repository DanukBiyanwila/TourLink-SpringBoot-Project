import { TestBed } from '@angular/core/testing';

import { HotelUserRatingDTOService } from './hotel-user-rating-dto.service';

describe('HotelUserRatingDTOService', () => {
  let service: HotelUserRatingDTOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelUserRatingDTOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
