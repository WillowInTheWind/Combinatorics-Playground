import { TestBed } from '@angular/core/testing';

import { ObjectRendererService } from './object-renderer.service';

describe('ObjectRendererService', () => {
  let service: ObjectRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
