import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './DTO/login-response.dto';
import { Response } from 'express';
import { sendRefreshToken } from './token-service';
import { sign } from 'jsonwebtoken';
import * as config from 'config';
import { User } from './user.entity';

const jwtConfig = config.get('jwtRefresh');

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');
  constructor(
    @InjectRepository(UserRepository)
    private userRespository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRespository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
    res?: Response,
  ): Promise<LoginResponseDto> {
    const username = await this.userRespository.validateUserPassword(authCredentialsDto);

    if (!username) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT with payload ${JSON.stringify(payload)}`);

    const refreshToken = this.createRefreshToken(payload);
    sendRefreshToken(res, refreshToken);

    return { accessToken };
  }

   createRefreshToken = (payload: any) => {
    console.log(payload);
    return sign({ username: payload, tokenVersion: payload.tokenVersion }, jwtConfig.secret, { expiresIn: 604800 });
  }

  createAccessToken = async (user: User) => {
    return await this.jwtService.sign({username: user.username});
  }

}
