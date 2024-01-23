import { TestBed } from '@angular/core/testing';

import { AñosService } from './años.service';

describe('AñosService', () => {
  let service: AñosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AñosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
