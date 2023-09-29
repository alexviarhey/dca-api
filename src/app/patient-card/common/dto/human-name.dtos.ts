const nameValidationRules = {
    type: "string",
    transform: ["trim"],
    minLength: 1,
    maxLength: 20,
}

export const humanNameValidationSchema = {
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
        firstName: nameValidationRules,
        lastName: nameValidationRules,
        given: nameValidationRules,
    },
    additionalProperties: false
}

export type CreateHumanNameDto = {
    firstName: string
    lastName: string
    given?: string
}

export type HumanNameDto = CreateHumanNameDto & {
    given: string | null
    text: string
}
