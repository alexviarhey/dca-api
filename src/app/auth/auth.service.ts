import { Injectable } from "@nestjs/common";
import { BaseService } from "../../core/base.service";
import { AuthTokens, SignInDto } from "./auth.domain";
import { Result } from "../../core/result";
import { InjectModel } from "@nestjs/mongoose";
import { PRACTITIONERS_COLLECTION, PractitionerSchema } from "../practitioners/schemas/practitioner.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { PractitionerRole } from "../practitioners/schemas/practitioner-role.schema";

export type AccessTokenPayload = {
   id: string,
   roles: PractitionerRole[]
}
@Injectable()
export class AuthService extends BaseService {

    private readonly invalidLoginOrPasswordMessage = 'Неверный логин или пароль!'

    constructor(
        @InjectModel(PRACTITIONERS_COLLECTION)
        private readonly practitionersModel: Model<PractitionerSchema>,
        private readonly jwtService: JwtService,
    ) {
        super('AuthService')
    }

    public async signIn({ login, password }: SignInDto): Promise<Result<AuthTokens>> {
        try {
            const practitioner = await this.practitionersModel.findOne({ login }, { _id: 1, passwordHash: 1, roles: 1 })
            if (!practitioner) return Result.err(this.invalidLoginOrPasswordMessage)

            const isPasswordMatch = await bcrypt.compare(`${password}`, practitioner.passwordHash);
            if (!isPasswordMatch) return Result.err(this.invalidLoginOrPasswordMessage)

            return Result.ok(
                await this.generateTokens(practitioner)
            )

        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }

    private async generateTokens(practitioner: PractitionerSchema): Promise<AuthTokens> {
        const accessPayload = {
            id: practitioner._id.toString(),
            roles: practitioner.roles,
        }
        return {
            accessToken: await this.jwtService.signAsync(accessPayload)
        }
    }
}
