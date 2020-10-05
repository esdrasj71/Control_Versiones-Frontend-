import { TestBed } from '@angular/core/testing';

import { ProcedurePurchaseService } from './procedure-purchase.service';

describe('ProcedurePurchaseService', () => {
  let service: ProcedurePurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedurePurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
