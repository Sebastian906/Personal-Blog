import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class GoogleLoginDto {
    @IsString({ message: 'El nombre debe ser un texto.' })
    name!: string;

    @IsEmail({}, { message: 'El correo electrónico no es válido.' })
    email!: string;

    @IsOptional()
    @IsUrl({}, { message: 'El avatar debe ser una URL válida.' })
    avatar?: string;
}