import { TestBed } from '@angular/core/testing';

import { CalfetchService } from './calfetch.service';

describe('CalfetchService', () => {
  let service: CalfetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalfetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
