import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { User } from './user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  },
);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);

export const ResGql = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Response => {
    return GqlExecutionContext.create(ctx).getContext().res;
  },
);
