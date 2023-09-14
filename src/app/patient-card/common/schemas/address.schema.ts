import { Schema } from "mongoose"

export interface IAddressSchema {
    country: string
    city: string
    street: string
    house: string
    apartment: string | null
    text: string
}

export const addressSchema = new Schema<IAddressSchema>({
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    apartment: { type: String, nullable: true, required: false, default: null },
    text: { type: String, required: true},
}, { _id: false })
