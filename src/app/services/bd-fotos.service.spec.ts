import { TestBed } from '@angular/core/testing';

import { BdFotosService } from './bd-fotos.service';

describe('BdFotosService', () => {
  let service: BdFotosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdFotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
