import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: false,
    secure: false,
    path: '/refresh_token',
  });
};
