import { TestBed } from '@angular/core/testing';

import { MayoromenorService } from './mayoromenor.service';

describe('MayoromenorService', () => {
  let service: MayoromenorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayoromenorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
