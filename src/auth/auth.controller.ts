import {
    Controller,
    HttpCode,
    HttpStatus,
    Get,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { LocalAuthGuard } from './guards/local-auth.guard';
  import { AuthRequest } from './models/AuthRequest';
  import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsersModule } from 'src/users/users.module';
  
  @Controller()
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: AuthRequest) {
      return this.authService.login(req.user);
    }

    @Get('getMe')
    async getMe(@CurrentUser() user: UsersModule) {
      return user;
    }
  }