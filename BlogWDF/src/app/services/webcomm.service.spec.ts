import { TestBed } from '@angular/core/testing';

import { WebcommService } from './webcomm.service';

describe('WebcommService', () => {
  let service: WebcommService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebcommService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
