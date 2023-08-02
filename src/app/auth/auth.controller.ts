import { Controller, Post } from "@nestjs/common";
import { AjvBody } from "../common/decorators/ajv.decorators";
import { SignInDto, signInAjvSchema } from "./auth.domain";


@Controller("/auth")
export class AuthController {
    @Post()
    public async signIn(
        @AjvBody(signInAjvSchema) dto: SignInDto
    ) {

    }
}
