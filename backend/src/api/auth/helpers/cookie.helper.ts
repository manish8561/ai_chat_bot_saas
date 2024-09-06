import { Response } from 'express';
import { COOKIE_DOMAIN, COOKIE_NAME } from 'src/common/constants';
import { AuthResponse } from '../types';

class CookieHelper {
  public async createCookie(
    authResponse: AuthResponse,
    response: Response,
  ): Promise<AuthResponse> {
    await this.clearCookie(COOKIE_NAME, response);

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    response.cookie(COOKIE_NAME, authResponse.accessToken, {
      path: '/',
      domain: COOKIE_DOMAIN,
      expires,
      httpOnly: true,
      signed: true,
    });
    return authResponse;
  }

  public async clearCookie(
    cookieName: string,
    response: Response,
  ): Promise<void> {
    response.clearCookie(cookieName, {
      path: '/',
      domain: COOKIE_DOMAIN,
      httpOnly: true,
      signed: true,
    });
  }
}

export default new CookieHelper();
