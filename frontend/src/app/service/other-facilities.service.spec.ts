import { TestBed } from '@angular/core/testing';

import { OtherFacilitiesService } from './other-facilities.service';

describe('OtherFacilitiesService', () => {
  let service: OtherFacilitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtherFacilitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
