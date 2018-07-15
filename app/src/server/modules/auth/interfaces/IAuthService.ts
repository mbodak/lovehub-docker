export interface IAuthService {
  options: IJwtOptions ;
  sign(credentials: { email: string, password: string }): Promise<string>;
}

export interface IJwtOptions {
  algorithm: string;
  expiresIn: number | string;
  jwtid: string;
}
