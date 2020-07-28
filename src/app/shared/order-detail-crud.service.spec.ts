import { TestBed } from '@angular/core/testing';

import { OrderDetailCRUDService } from './order-detail-crud.service';

describe('OrderDetailCRUDService', () => {
  let service: OrderDetailCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
