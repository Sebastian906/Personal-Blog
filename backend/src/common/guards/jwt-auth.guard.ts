import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();

        const token: string | undefined = (req.cookies as Record<string, string>)?.access_token;

        if (!token) {
            throw new ForbiddenException('No Autorizado');
        }

        try {
            const decoded = this.jwtService.verify(token);
            (req as any).user = decoded;
            return true;
        } catch {
            throw new UnauthorizedException('Token inválido o expirado.');
        }
    }
}