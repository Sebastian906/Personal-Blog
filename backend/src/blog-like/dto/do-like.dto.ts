import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DoLikeDto {
    @IsNotEmpty({ message: 'El usuario es requerido.' })
    @IsMongoId({ message: 'El usuario debe ser un ID válido.' })
    user: string;

    @IsNotEmpty({ message: 'El blog es requerido.' })
    @IsMongoId({ message: 'El blog debe ser un ID válido.' })
    blogId: string;
}