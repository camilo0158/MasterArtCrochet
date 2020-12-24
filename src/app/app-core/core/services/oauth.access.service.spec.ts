import { TestBed } from '@angular/core/testing';

import { Oauth.AccessService } from './oauth.access.service';

describe('Oauth.AccessService', () => {
  let service: Oauth.AccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Oauth.AccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
