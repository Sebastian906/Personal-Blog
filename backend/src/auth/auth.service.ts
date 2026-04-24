import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }
    
    async register(name: string, email: string, password: string, confirmPassword: string) {
        try {
            if (password !== confirmPassword) {
                throw new ConflictException('Las contraseñas no coinciden.');
            }

            const existingUser = await this.usersService.findByEmail(email);
            if (existingUser) {
                throw new ConflictException('El usuario ya está registrado.');  // 409
            }

            const hashedPassword = bcryptjs.hashSync(password);
            await this.usersService.create({ name, email, password: hashedPassword });

            return { success: true, message: 'Registro exitoso.' };
        } catch (error) {
            if (error instanceof ConflictException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }

    async login(email: string, password: string, res: Response) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (!user) {
                throw new UnauthorizedException('Credenciales inválidas.');
            }

            const isMatch = await bcryptjs.compare(password, user.password);
            if (!isMatch) {
                throw new UnauthorizedException('Credenciales inválidas.');
            }

            const payload = {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            };

            const token = this.jwtService.sign(payload);

            const isProduction = process.env.NODE_ENV === 'production';

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'strict',
                path: '/',
            });

            const { password: _, ...safeUser } = user.toObject({ getters: true });

            return { success: true, user: safeUser, message: 'Inicio de sesión correcto.' };
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            const message = error instanceof Error ? error.message : 'Error interno del servidor';
            throw new InternalServerErrorException(message);
        }
    }
}
