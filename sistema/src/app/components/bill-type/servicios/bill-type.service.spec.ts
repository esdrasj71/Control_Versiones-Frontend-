import { TestBed } from '@angular/core/testing';

import { BillTypeService } from './bill-type.service';

describe('BillTypeService', () => {
  let service: BillTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
