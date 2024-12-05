import { TestBed } from '@angular/core/testing';

import { NewbieMentorService } from './newbie-mentor.service';

describe('NewbieMentorService', () => {
  let service: NewbieMentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewbieMentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
