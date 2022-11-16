import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAssignmentTableComponent } from './question-assignment-table.component';

describe('QuestionAssignmentTableComponent', () => {
  let component: QuestionAssignmentTableComponent;
  let fixture: ComponentFixture<QuestionAssignmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionAssignmentTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionAssignmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
