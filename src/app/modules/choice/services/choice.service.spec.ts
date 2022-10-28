/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChoiceService } from './choice.service';

describe('Service: Choice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoiceService]
    });
  });

  it('should ...', inject([ChoiceService], (service: ChoiceService) => {
    expect(service).toBeTruthy();
  }));
});
