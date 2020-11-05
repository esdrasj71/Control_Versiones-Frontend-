import { TestBed } from '@angular/core/testing';

import { ResultStatementService } from './result-statement.service';

describe('ResultStatementService', () => {
  let service: ResultStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
