import { Course, Professor } from './courses';

export interface Assignment {
  idAssignment: number,
  title: string,
  createdAt: Date,
  course: Course,
  professor: Professor,
  enabled: boolean,
  accessCode: String
}