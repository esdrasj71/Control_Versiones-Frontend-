import { TestBed } from '@angular/core/testing';

import { PurchaseHeaderService } from './purchase-header.service';

describe('PurchaseHeaderService', () => {
  let service: PurchaseHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
