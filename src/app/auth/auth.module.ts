import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PRACTITIONERS_COLLECTION, practitionerSchema } from "../practitioners/schemas/practitioner.schema";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRED') },
            })
        }),
        MongooseModule.forFeature([
            { name: PRACTITIONERS_COLLECTION, schema: practitionerSchema},
        ]),
    ],
    providers: [],
    controllers: []

})
export class AuthModule { }
