import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }
    
    async register(name: string, email: string, password: string) {
        try {
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
}
