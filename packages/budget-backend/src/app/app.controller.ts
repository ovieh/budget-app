import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import * as config from 'config';
import { User } from '../auth/user.entity';
import { sendRefreshToken } from '../auth/token-service';
import { AuthService } from '../auth/auth.service';
import { IConfig } from '../types';

const jwtConfig: IConfig = config.get('jwt');

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('/refresh_token')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response<{ ok: boolean; accessToken: string }>> {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }
    let payload = null;

    try {
      payload = verify(
        token,
        process.env.JWT_REFRESH_SECRET || jwtConfig.secret2,
      );
    } catch (error) {
      return res.send({ ok: false, accessToken: '' });
    }
    const user = await User.findOne(payload.username);
    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }
    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }
    sendRefreshToken(res, await this.authService.createRefreshToken(user));

    return res.send({
      ok: true,
      accessToken: await this.authService.createAccessToken(user),
    });
  }
}
