
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
        street: addressItemValidationRules,
        house: addressItemValidationRules,
        apartment: addressItemValidationRules
    },
    additionalProperties: false

}

export type CreateAddressDto = {
    country: string
    city: string
    street: string
    house: string
    apartment?: string
}

export type AddressDto = {
    text: string
    country: string
    city: string
    street: string
    house: string
    apartment: string
}
