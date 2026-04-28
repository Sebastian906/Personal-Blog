import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('get-user/:userId')
    async getUser(@Param('userId') userId: string) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        const { password, ...safeUser } = user.toObject({ getters: true });
        return {
            success: true,
            message: 'Datos del usuario obtenidos.',
            user: safeUser,
        };
    }
}
