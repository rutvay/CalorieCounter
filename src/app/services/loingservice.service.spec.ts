import { TestBed } from '@angular/core/testing';

import { LoingserviceService } from './loingservice.service';

describe('LoingserviceService', () => {
  let service: LoingserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoingserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
