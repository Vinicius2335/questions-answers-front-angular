// NOTE: Atençao aki.
export class SignUpProfessor {
  name: string;
  email: string;
  role: string[];

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
    this.role = ['ROLE_PROFESSOR'];
  }
}
