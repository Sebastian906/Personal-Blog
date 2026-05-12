import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface JwtPayload {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
}

export const CurrentUser = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext): JwtPayload => {
        const req = ctx.switchToHttp().getRequest<Request>();
        return (req as any).user as JwtPayload;
    },
);