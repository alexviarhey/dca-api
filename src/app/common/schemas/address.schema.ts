import { Schema } from "mongoose"

export interface IAddressSchema {
    country: string
    city: string
    street: string
    house: string
    apartment: string | null
}

export const addressSchema = new Schema<IAddressSchema>({
    country: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    house: { type: String, required: true },
    apartment: { type: String, nullable: true, required: false, default: null },
}, { _id: false })
