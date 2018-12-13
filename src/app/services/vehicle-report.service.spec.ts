import { TestBed } from '@angular/core/testing';

import { VehicleReportService } from './vehicle-report.service';

describe('VehicleReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleReportService = TestBed.get(VehicleReportService);
    expect(service).toBeTruthy();
  });
});
