import { TestBed } from '@angular/core/testing';

import { CardmanagerService } from './cardmanager.service';

describe('CardmanagerService', () => {
  let service: CardmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
