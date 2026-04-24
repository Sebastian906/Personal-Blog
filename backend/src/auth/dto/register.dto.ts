import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    name: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email: string;

    @IsString({ message: 'La contraseña debe ser un texto.' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    password: string;

    @IsString({ message: 'La confirmación debe ser un texto.' })
    @MinLength(8, { message: 'La confirmación debe tener al menos 8 caracteres.' })
    confirmPassword: string;
}