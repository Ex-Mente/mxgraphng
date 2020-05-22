import { TestBed } from '@angular/core/testing';

import { AngularmxgraphService } from './angularmxgraph.service';

describe('AngularmxgraphService', () => {
  let service: AngularmxgraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularmxgraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
