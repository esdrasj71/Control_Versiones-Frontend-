import { TestBed } from '@angular/core/testing';

import { EmployeePositionService } from './employee-position.service';

describe('EmployeePositionService', () => {
  let service: EmployeePositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeePositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
