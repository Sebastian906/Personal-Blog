import { IsMongoId, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty({ message: 'El autor es requerido.' })
    @IsMongoId({ message: 'El autor debe ser un ID válido.' })
    author: string;

    @IsNotEmpty({ message: 'El blog es requerido.' })
    @IsMongoId({ message: 'El blog debe ser un ID válido.' })
    blogId: string;

    @IsNotEmpty({ message: 'El comentario es requerido.' })
    @IsString({ message: 'El comentario debe ser texto.' })
    @MinLength(8, { message: 'El comentario debe tener al menos 8 caracteres.' })
    comment: string;
}