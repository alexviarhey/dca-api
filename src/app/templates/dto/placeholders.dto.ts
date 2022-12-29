import { ApiProperty } from "@nestjs/swagger";

export const createPlaceholderSchema = {
    type: 'object',
    additionalProperties: false,
    allRequired: true,
    properties: {
        name: {type: 'string'},
        placeholder: { type: 'string', pattern: "^{{\\w+}}$" }
    }
}

export const updatePlaceholderSchema = {
    ...createPlaceholderSchema,
    allRequired: false,
    required: ["_id"],
    properties: {
        _id: {type: 'string'},
        ...createPlaceholderSchema.properties
    }
}

export class CreatePlaceholderDto {
    @ApiProperty()
    name: string

    @ApiProperty()
    placeholder: string
}

export class PlaceholderDto extends CreatePlaceholderDto {
    @ApiProperty()
    _id: string
}

export class UpdatePlaceholderDto {
    @ApiProperty()
    _id: string

    @ApiProperty({ required: false})
    name?: string

    @ApiProperty({ required: false })
    placeholder?: string
}
