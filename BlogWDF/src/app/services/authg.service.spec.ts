import { TestBed } from '@angular/core/testing';

import { AuthgService } from './authg.service';

describe('AuthgService', () => {
  let service: AuthgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
