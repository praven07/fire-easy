import { TestBed } from '@angular/core/testing';

import { FireEasyService } from './fire-easy.service';

describe('FireEasyService', () => {
  let service: FireEasyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireEasyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
