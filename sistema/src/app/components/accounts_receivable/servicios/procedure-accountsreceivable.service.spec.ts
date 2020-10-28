import { TestBed } from '@angular/core/testing';

import { ProcedureAccountsreceivableService } from './procedure-accountsreceivable.service';

describe('ProcedureAccountsreceivableService', () => {
  let service: ProcedureAccountsreceivableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcedureAccountsreceivableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
