import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';
import { User } from './user.entity';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);

export const ResGql = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res,
);
