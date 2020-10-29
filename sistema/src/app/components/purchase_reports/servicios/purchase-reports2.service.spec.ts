import { TestBed } from '@angular/core/testing';

import { PurchaseReports2Service } from './purchase-reports2.service';

describe('PurchaseReports2Service', () => {
  let service: PurchaseReports2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseReports2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
