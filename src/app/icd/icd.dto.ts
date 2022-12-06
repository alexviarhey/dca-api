import { ApiProperty } from "@nestjs/swagger"


export class CreateICDDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    code: string
}

export class ICDDto extends CreateICDDto {
    @ApiProperty()
    _id: string
}

export class GetICDFilters {
    @ApiProperty({required: false})
    code?: string

    @ApiProperty({required: false})
    name?: string
}

export const getICDFiltersSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        code: { type: "string" },
        name: { type: "string" },
    }
}