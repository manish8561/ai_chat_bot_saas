export interface CustomRequest extends Request {
  user: {
    sub: string;
    role: string;
    iat: number;
    exp: number;
  };
}
