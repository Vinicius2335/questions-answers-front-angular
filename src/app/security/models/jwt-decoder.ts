export interface JwtDecoder {
  sub: string;
  roles: string[];
  exp: number;
}
