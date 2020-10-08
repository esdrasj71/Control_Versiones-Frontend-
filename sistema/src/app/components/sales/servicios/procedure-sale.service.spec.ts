import { TestBed } from '@angular/core/testing';

import { ProcedureSaleService } from './procedure-sale.service';

describe('ProcedureSaleService', () => {
  let service: ProcedureSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedureSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
