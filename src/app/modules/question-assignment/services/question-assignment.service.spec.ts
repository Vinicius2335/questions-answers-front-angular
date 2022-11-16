/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QuestionAssignmentService } from './question-assignment.service';

describe('Service: QuestionAssignment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionAssignmentService]
    });
  });

  it('should ...', inject([QuestionAssignmentService], (service: QuestionAssignmentService) => {
    expect(service).toBeTruthy();
  }));
});
