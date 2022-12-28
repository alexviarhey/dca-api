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
    searchQuery?: string
}

export const getICDFiltersSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        searchQuery: { type: "string" },
    }
}