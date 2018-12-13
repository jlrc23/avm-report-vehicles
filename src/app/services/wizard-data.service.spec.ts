import { TestBed } from '@angular/core/testing';

import { WizardDataService } from './wizard-data.service';

describe('WizardDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WizardDataService = TestBed.get(WizardDataService);
    expect(service).toBeTruthy();
  });
});
