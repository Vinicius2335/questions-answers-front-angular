/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfirmDeleteService } from './confirm-delete.service';

describe('Service: ConfirmDelete', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmDeleteService]
    });
  });

  it('should ...', inject([ConfirmDeleteService], (service: ConfirmDeleteService) => {
    expect(service).toBeTruthy();
  }));
});
