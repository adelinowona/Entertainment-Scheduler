import { TestBed } from '@angular/core/testing';

import { AddEventService } from './add-event.service';

describe('AddEventService', () => {
  let service: AddEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
