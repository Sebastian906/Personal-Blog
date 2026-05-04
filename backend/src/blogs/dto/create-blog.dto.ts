import { IsMongoId, IsString, MinLength, Matches, IsNotEmpty } from 'class-validator';

export class CreateBlogDto {
    @IsNotEmpty({ message: 'El autor es requerido.' })
    @IsMongoId({ message: 'El autor debe ser un ID válido.' })
    author: string;

    @IsNotEmpty({ message: 'La categoría es requerida.' })
    @IsMongoId({ message: 'La categoría debe ser un ID válido.' })
    category: string;

    @IsNotEmpty({ message: 'El título es requerido.' })
    @IsString({ message: 'El título debe ser texto.' })
    @MinLength(3, { message: 'El título debe tener al menos 3 caracteres.' })
    title: string;

    @IsNotEmpty({ message: 'La ficha es requerida.' })
    @IsString({ message: 'La ficha debe ser texto.' })
    @MinLength(3, { message: 'La ficha debe tener al menos 3 caracteres.' })
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'La ficha solo puede contener letras minúsculas, números y guiones.',
    })
    slug: string;

    @IsNotEmpty({ message: 'El contenido es requerido.' })
    @IsString({ message: 'El contenido debe ser texto.' })
    @MinLength(3, { message: 'El contenido debe tener al menos 3 caracteres.' })
    blogContent: string;
}