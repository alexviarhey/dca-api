import { ApiProperty } from "@nestjs/swagger";

export const idDtoSchema = {
    type: 'object',
    allRequired: true,
    additionalProperties: false,
    properties: {
        id: { type: "string" }
    }
}

export class IdDto {
    @ApiProperty()
    id: string
}