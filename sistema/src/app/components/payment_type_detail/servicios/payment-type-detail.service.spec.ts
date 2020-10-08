import { TestBed } from '@angular/core/testing';

import { PaymentTypeDetailService } from './payment-type-detail.service';

describe('PaymentTypeDetailService', () => {
  let service: PaymentTypeDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentTypeDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
