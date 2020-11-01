import { TestBed } from '@angular/core/testing';

import { Reports2Service } from './reports2.service';

describe('Reports2Service', () => {
  let service: Reports2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reports2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
