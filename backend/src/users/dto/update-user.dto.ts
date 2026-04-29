import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    name?: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password?: string;
}