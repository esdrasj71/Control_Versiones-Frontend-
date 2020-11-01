import { TestBed } from '@angular/core/testing';

import { InventoryReports2Service } from './inventory-reports2.service';

describe('InventoryReports2Service', () => {
  let service: InventoryReports2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryReports2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
