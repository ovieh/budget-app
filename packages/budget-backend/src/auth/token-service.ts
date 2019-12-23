import { Response } from 'express';
import { sign } from 'jsonwebtoken';
import * as config from 'config';
const jwtConfig = config.get('jwt');

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

// export const createRefreshToken = (payload) => {
//   console.log(payload);

//   return sign(payload, process.env.JWT_SECRET || jwtConfig.secret);
// };

// export const createAccessToken = (payload) => {
//   return sign(payload, process.env.JWT_SECRET || jwtConfig.secret, { expiresIn: '15m'});
// };
