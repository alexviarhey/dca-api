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
    @ApiProperty()
    page: number

    @ApiProperty()
    size: number

    @ApiProperty({required: false})
    code?: string

    @ApiProperty({required: false})
    name?: string
}

export const getICDFiltersSchema = {
    type: 'object',
    additionalProperties: false,
    required: ["page", "size"],
    properties: {
        page: { type: "number", minimum: 0 },
        size: { type: "number", maximum: 1 },
        code: { type: "string" },
        name: { type: "string" },
    }
}