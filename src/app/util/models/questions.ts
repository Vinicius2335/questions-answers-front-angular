import { Professor } from './courses';
import { Course } from 'src/app/util/models/courses';

export interface Question {
  idQuestion: number;
  title: string;
  course: Course;
  professor: Professor;
  enabled: boolean;
}
