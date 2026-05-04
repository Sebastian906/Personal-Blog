import { IsMongoId, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class UpdateBlogDto {
    @IsOptional()
    @IsMongoId({ message: 'La categoría debe ser un ID válido.' })
    category?: string;

    @IsOptional()
    @IsString({ message: 'El título debe ser texto.' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres.' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'La ficha debe ser texto.' })
    @MinLength(3, { message: 'La ficha debe tener al menos 3 caracteres.' })
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'La ficha solo puede contener letras minúsculas, números y guiones.',
    })
    slug?: string;

    @IsOptional()
    @IsString({ message: 'El contenido debe ser texto.' })
    @MinLength(3, { message: 'El contenido debe tener al menos 3 caracteres.' })
    blogContent?: string;
}