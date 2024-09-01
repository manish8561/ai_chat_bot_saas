import { Response } from "express";
import { COOKIE_NAME } from "src/common/constants";

export const createCookie = async (accessToken: string, response: Response): Promise<void> => {
    await clearCookie(COOKIE_NAME, response);

    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    response.cookie(COOKIE_NAME, accessToken, {
        path: '/',
        domain: 'localhost',
        expires,
        httpOnly: true,
        signed: true,
    });
}

export const clearCookie = async (cookieName: string, response: Response): Promise<void> => {
    response.clearCookie(cookieName, {
        path: '/',
        domain: 'localhost',
        httpOnly: true,
        signed: true,
    });
}