import { TestBed } from '@angular/core/testing';

import { PurchaseReportsService } from './purchase-reports.service';

describe('PurchaseReportsService', () => {
  let service: PurchaseReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
