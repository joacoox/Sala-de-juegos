import { TestBed } from '@angular/core/testing';

import { AuthfireService } from './authfire.service';

describe('AuthfireService', () => {
  let service: AuthfireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthfireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
