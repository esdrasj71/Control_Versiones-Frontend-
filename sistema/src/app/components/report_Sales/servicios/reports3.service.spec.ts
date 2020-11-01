import { TestBed } from '@angular/core/testing';

import { Reports3Service } from './reports3.service';

describe('Reports3Service', () => {
  let service: Reports3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Reports3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
