
export const signInAjvSchema = {
    type: 'object',
    required: ['login', 'password'],
    additionalProperties: false,
    properties: {
        login: {type: 'string', nullable: false},
        password: {type: 'string', nullable: false},
    }
}

export type SignInDto = {
    login: string
    password: string
}

export type AuthTokens = {
    accessToken: string,
}
