import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { LoginResponseDto } from './DTO/login-response.dto';
import { User } from './user.entity';
import { ResGql } from './get-user.decorator';
import { Response } from 'express';
import { UserRepository } from './user.repository';
import { sendRefreshToken } from './token-service';

@Resolver(of => User)
export class AuthResolver {
  private logger = new Logger('Auth Resolver');
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Mutation(returns => Boolean)
  async signUp(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    try {
      await this.authService.signUp({ username, password });
    } catch (error) {
      this.logger.error(`could not register user ${username}`);
      return false;
    }
    return true;
  }

  @Mutation(returns => LoginResponseDto)
  async signIn(
    @ResGql() res: Response,
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginResponseDto> {
    const result = await this.authService.signIn({ username, password }, res);
    return result;
  }

  // Temporary, for testing
  @Mutation(returns => Boolean)
  async revokeRefreshToken(
    @Args('userId') userId: number,
  ): Promise<boolean> {
    await this.userRepository.increment({id: userId}, 'tokenVersion', 1);
    return true;
  }

  @Mutation(returns => Boolean)
  async signOut(
    @ResGql() res: Response,
  ): Promise<boolean> {
    sendRefreshToken(res, '');
    return true;
  }

}
