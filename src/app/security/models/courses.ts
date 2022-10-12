export interface Course {
  idCourse: number;
  name: string;
  enabled: boolean;
  professor: Professor;
}

export interface Professor {
  idProfessor: number;
  email: string;
  name: string;
}