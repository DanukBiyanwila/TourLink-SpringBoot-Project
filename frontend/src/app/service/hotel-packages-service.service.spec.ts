import { TestBed } from '@angular/core/testing';

import { HotelPackagesServiceService } from './hotel-packages-service.service';

describe('HotelPackagesServiceService', () => {
  let service: HotelPackagesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelPackagesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
