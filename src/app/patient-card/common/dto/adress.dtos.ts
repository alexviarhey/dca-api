import { ApiProperty } from "@nestjs/swagger";

const addressItemValidationRules = {
    type: "string",
    transform: ["trim"],
    minLength: 1,
    maxLength: 30,
}

export const addressValidationSchema = {
    type: "object",
    required: ["country", "city", "street", "house"],
    properties: {
        country: addressItemValidationRules,
        city: addressItemValidationRules,
        street:addressItemValidationRules,
        house: addressItemValidationRules,
        apartment: addressItemValidationRules
    },
    additionalProperties: false

}

export class CreateAddressDto {
    @ApiProperty()
    country: string

    @ApiProperty()
    city: string

    @ApiProperty()
    street: string

    @ApiProperty()
    house: string

    @ApiProperty({required: false})
    apartment?: string
}


export class AddressDto {
    @ApiProperty()
    text: string

    @ApiProperty()
    country: string

    @ApiProperty()
    city: string

    @ApiProperty()
    street: string

    @ApiProperty()
    house: string

    @ApiProperty()
    apartment: string
}