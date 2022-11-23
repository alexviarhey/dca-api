import { ApiProperty } from "@nestjs/swagger";
import { GenderValues } from "../types/gender";

export const getPatientsFiltersSchema = {
    type: 'object',
    required: ["page", "size"],
    additionalProperties: false,
    properties: {
        page: { type: "number",  minimum: 0 },
        size: { type: "number", minimum: 1 },
        name: { type: "string" },
        address: { type: "string" },
        active: { type: "boolean" },
        gender: { enum: Object.values(GenderValues) },
        phone: { type: "string" }
    }
}

export class GetPatientsFilters  {
    @ApiProperty()
    page: number

    @ApiProperty()
    size: number

    @ApiProperty({ required: false })
    name?: string

    @ApiProperty({ required: false })
    address?: string

    @ApiProperty({ required: false })
    active?: number

    @ApiProperty({enum: GenderValues, required: false})
    gender?: GenderValues

    @ApiProperty({ required: false })
    phone?: string
}
