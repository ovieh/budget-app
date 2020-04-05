import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';
import { User } from './user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

// For REST Controller(s)
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
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
