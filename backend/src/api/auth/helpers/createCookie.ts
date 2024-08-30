import { Response } from "express";

export const createCookie = async (accessToken: string, response: Response): Promise<void> => {
    const expires = new Date();
    expires.setDate(expires.getDate() + 1);
    response.cookie('accessToken', accessToken, {
        path: '/',
        domain: 'localhost',
        expires,
        httpOnly: true,
        signed: true,
    });
}