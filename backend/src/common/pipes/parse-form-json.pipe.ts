import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFormJsonPipe implements PipeTransform {
    transform(value: string) {
        try {
            return JSON.parse(value);
        } catch {
            throw new BadRequestException('El campo data no es un JSON válido.');
        }
    }
}