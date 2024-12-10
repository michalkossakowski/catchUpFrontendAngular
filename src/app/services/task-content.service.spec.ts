import { TestBed } from '@angular/core/testing';

import { TaskContentService } from './task-content.service';

describe('TaskContentService', () => {
  let service: TaskContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
