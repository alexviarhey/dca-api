import { ApiProperty } from "@nestjs/swagger";

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

export class CreateHumanNameDto  {
    @ApiProperty()
    firstName: string

    @ApiProperty()
    lastName: string

    @ApiProperty({required: false})
    given?: string
}

export class HumanNameDto extends CreateHumanNameDto {
    @ApiProperty({nullable: true})
    given: string | null

    @ApiProperty()
    text: string
}
