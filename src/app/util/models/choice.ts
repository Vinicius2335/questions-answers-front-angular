import { Professor } from './courses';
import { Question } from 'src/app/util/models/questions';

export interface Choice {
  idChoice: number;
  title: string;
  correctAnswer: boolean;
  question: Question;
  professor: Professor;
  enabled: boolean;
}
