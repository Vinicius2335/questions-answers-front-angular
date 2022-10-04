export class JwtResponse {
  constructor(
    public accessToken: string,
    public type: string,
    public username: string,
    public authorities: string[]
  ) {
  }
}
