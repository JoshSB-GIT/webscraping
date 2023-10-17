import { TestBed } from '@angular/core/testing';

import { RedditserviceService } from './redditservice.service';

describe('RedditserviceService', () => {
  let service: RedditserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedditserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
