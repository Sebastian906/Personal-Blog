import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UnsupportedMediaTypeException } from '@nestjs/common';

const ALLOWED_MIMETYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp', 'image/svg+xml'];

export const ImageFileInterceptor = () =>
    FileInterceptor('file', {
        storage: memoryStorage(),
        fileFilter: (_req, file, cb) => {
            if (!ALLOWED_MIMETYPES.includes(file.mimetype)) {
                return cb(
                    new UnsupportedMediaTypeException('Solo se aceptan imágenes PNG, JPG, JPEG, WEBP o SVG.'),
                    false,
                );
            }
            cb(null, true);
        },
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    });