import { TestBed, inject } from '@angular/core/testing';

import { PromptSelectorService } from './prompt-selector.service';

describe('PromptSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromptSelectorService]
    });
  });

  it('should be created', inject([PromptSelectorService], (service: PromptSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
