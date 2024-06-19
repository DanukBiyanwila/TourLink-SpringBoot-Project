import { TestBed } from '@angular/core/testing';

import { DriverGuidePackageService } from './driver-guide-package.service';

describe('DriverGuidePackageService', () => {
  let service: DriverGuidePackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverGuidePackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
