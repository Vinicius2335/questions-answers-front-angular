import { Assignment } from "./assignment";
import { Professor } from "./courses";
import { Question } from "./questions";

export interface QuestionAssignment{
  idQuestionAssignment: number,
  question: Question,
  assignment: Assignment,
  professor: Professor,
  grade: number,
  enabled: boolean,
}