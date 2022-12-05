import { TestBed } from '@angular/core/testing';

import { CampaignService } from './campain.service';

describe('CampainService', () => {
  let service: CampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
