import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import express from 'express';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @HttpCode(HttpStatus.OK)
    register(@Body() body: RegisterDto) {
        return this.authService.register(body.name, body.email, body.password, body.confirmPassword);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() body: LoginDto, @Res({ passthrough: true }) res: express.Response) {
        return this.authService.login(body.email, body.password, res);
    }

    @Post('google-login')
    @HttpCode(HttpStatus.OK)
    googleLogin(@Body() body: GoogleLoginDto, @Res({ passthrough: true }) res: express.Response) {
        return this.authService.googleLogin(body.name, body.email, body.avatar ?? '', res);
    }

    @Get('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Res({ passthrough: true }) res: express.Response) {
        return this.authService.logout(res);
    }
}
