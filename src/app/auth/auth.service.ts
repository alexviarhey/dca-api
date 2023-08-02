import { Injectable } from "@nestjs/common";
import { BaseService } from "../../core/base.service";
import { AuthTokens, SignInDto } from "./auth.domain";
import { Result } from "../../core/result";
import { InjectModel } from "@nestjs/mongoose";
import { PRACTITIONERS_COLLECTION, PractitionerSchema } from "../practitioners/schemas/practitioner.schema";
import { Model } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AuthService extends BaseService {

    private readonly invalidLoginOrPasswordMessage = 'Неверный логин или пароль!'

    constructor(
        @InjectModel(PRACTITIONERS_COLLECTION)
        private readonly practitionersModel: Model<PractitionerSchema>,
        private readonly jwtService: JwtService
    ) {
        super('AuthService')
    }

    public async signIn({ login, password }: SignInDto): Promise<Result<AuthTokens>> {
        try {
            const practitioner = await this.practitionersModel.findOne({ login }, {_id: 1, passwordHash: 1, roles: 1})
            if(!practitioner) return Result.err(this.invalidLoginOrPasswordMessage)

            const isPasswordMatch = await bcrypt.compare(`${password}`, practitioner.passwordHash);
            if(!isPasswordMatch) return Result.err(this.invalidLoginOrPasswordMessage)

            const accessPayload = {
                id: practitioner._id.toString(),
                roles: practitioner.roles,
            }

            const refreshPayload = {
                id: practitioner._id.toString(),
                createdDate: new Date()
            }

            return Result.ok({
                accessToken: await this.jwtService.signAsync(accessPayload),
                refreshToken: await this.jwtService.signAsync(refreshPayload)
            })
        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }
}
