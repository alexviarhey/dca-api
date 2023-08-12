import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { PRACTITIONERS_COLLECTION, PractitionerSchema } from '../practitioners/schemas/practitioner.schema';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AccessTokenPayload } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        @InjectModel(PRACTITIONERS_COLLECTION)
        private readonly practitionersModel: Model<PractitionerSchema>,
        private readonly configService: ConfigService,
        private jwtService: JwtService,
    ) {
    }

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Authorization header must be present!');
        }
        try {
            const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
                token,
                { secret: this.configService.get('JWT_SECRET') }
            );

            const practitioner = await this.practitionersModel.findById(payload.id)
            if (!practitioner) {
                throw new UnauthorizedException('Invalid payload. Practitioner not found!')
            }

            request.practitioner = practitioner
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.get('Authorization')?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined;
    }
}
