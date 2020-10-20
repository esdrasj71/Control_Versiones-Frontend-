import { TestBed } from '@angular/core/testing';

import { DebsToPayService } from './debs-to-pay.service';

describe('DebsToPayService', () => {
  let service: DebsToPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebsToPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
