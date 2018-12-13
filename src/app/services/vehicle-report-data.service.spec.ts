import { TestBed } from '@angular/core/testing';

import { VehicleReportDataService } from './vehicle-report-data.service';

describe('VehicleReportDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VehicleReportDataService = TestBed.get(VehicleReportDataService);
    expect(service).toBeTruthy();
  });
});
