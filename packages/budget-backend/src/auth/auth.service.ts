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
import { IConfig } from '../types';

const jwtConfig = config.get<IConfig>('jwt');

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

    const user = await this.userRespository.findOne({username});

    const payload = { username };
    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(`Generated JWT with payload ${JSON.stringify(payload)}`);

    const refreshToken = this.createRefreshToken({username: user.username, tokenVersion: user.tokenVersion});
    sendRefreshToken(res, refreshToken);

    return { accessToken };
  }

   createRefreshToken = (payload: { username: string, tokenVersion: string }) => {
    return sign({ username: payload, tokenVersion: payload.tokenVersion }, process.env.JWT_REFRESH_SECRET || jwtConfig.secret2, { expiresIn: '7d' });
  }

  createAccessToken = async (user: User) => {
    return this.jwtService.sign({username: user.username});
  }

}
