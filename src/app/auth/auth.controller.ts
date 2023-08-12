import { Controller, Post, UseInterceptors } from "@nestjs/common";
import { AjvBody } from "../common/decorators/ajv.decorators";
import { SignInDto, signInAjvSchema } from "./auth.domain";
import { AuthService } from "./auth.service";
import { CustomResponseInterceptor } from "../common/interceptors/custom-response.interceptor";

@Controller("/auth")
@UseInterceptors(CustomResponseInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post()
    public async signIn(
        @AjvBody(signInAjvSchema) dto: SignInDto
    ) {
        return await this.authService.signIn(dto)
    }
}
