import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthServiceImplemantation } from "../application/auth/auth.service";
import { LogindDto } from "../application/auth/dto/LogindDto";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthServiceImplemantation) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LogindDto) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: any) {
    return { user: req.user };
  }
}

