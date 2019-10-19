import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authcCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authcCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authcCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
    return this.authService.signIn(authcCredentialsDto);
  }

}
