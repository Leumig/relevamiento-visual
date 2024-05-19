import { TestBed } from '@angular/core/testing';

import { BdUsuariosService } from './bd-usuarios.service';

describe('BdUsuariosService', () => {
  let service: BdUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
