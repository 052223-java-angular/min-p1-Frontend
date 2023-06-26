import { TestBed } from '@angular/core/testing';

import { OnlyLoggedInUserGuardService } from './only-logged-in-user-guard.service';

describe('OnlyLoggedInUserGuardService', () => {
  let service: OnlyLoggedInUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyLoggedInUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
