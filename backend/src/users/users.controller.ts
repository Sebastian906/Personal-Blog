import { BadRequestException, Controller, Get, NotFoundException, Param, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ImageFileInterceptor } from '../common/interceptors/file-upload.interceptor';
import express from 'express';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('get-user/:userId')
    async getUser(@Param('userId') userId: string) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        return {
            success: true,
            message: 'Datos del usuario obtenidos.',
            user,
        };
    }

    @Put('update-user/:userId')
    @UseInterceptors(ImageFileInterceptor())
    async updateUser(
        @Param('userId') userId: string,
        @Req() req: express.Request,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        let dto: UpdateUserDto = {};
        const dataHeader = req.headers['x-form-data'];
        if (dataHeader) {
            try {
                dto = JSON.parse(String(dataHeader));
            } catch {
                throw new BadRequestException('El encabezado x-form-data no es un JSON válido.');
            }
        }
        const user = await this.usersService.updateById(userId, dto, file);
        if (!user) {
            throw new NotFoundException('Usuario no encontrado.');
        }
        return {
            success: true,
            message: 'Datos actualizados.',
            user,
        };
    }
}
