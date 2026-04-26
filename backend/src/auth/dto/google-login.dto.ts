import { IsEmail, IsOptional, IsString } from 'class-validator';

export class GoogleLoginDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    name!: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email!: string;

    @IsOptional()
    @IsString()
    avatar?: string;
}