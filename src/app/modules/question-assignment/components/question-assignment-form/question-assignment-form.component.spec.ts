import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAssignmentFormComponent } from './question-assignment-form.component';

describe('QuestionAssignmentFormComponent', () => {
  let component: QuestionAssignmentFormComponent;
  let fixture: ComponentFixture<QuestionAssignmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAssignmentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAssignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
