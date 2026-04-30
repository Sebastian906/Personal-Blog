import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateCategoryDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser un texto.' })
    @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
    name?: string;

    @IsOptional()
    @IsString({ message: 'La ficha debe ser un texto.' })
    @MinLength(3, { message: 'La ficha debe tener al menos 3 caracteres.' })
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'La ficha solo puede contener letras minúsculas, números y guiones.',
    })
    slug?: string;

    @IsOptional()
    @IsString({ message: 'El ícono debe ser un texto.' })
    icon?: string;
}