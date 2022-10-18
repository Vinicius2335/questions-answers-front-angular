/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseFormService } from './course-form.service';

describe('Service: CourseForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseFormService]
    });
  });

  it('should ...', inject([CourseFormService], (service: CourseFormService) => {
    expect(service).toBeTruthy();
  }));
});
