import { TestBed } from '@angular/core/testing';

import { ApiTypecodeService } from './api-typecode.service';

describe('ApiTypecodeService', () => {
  let service: ApiTypecodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTypecodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
