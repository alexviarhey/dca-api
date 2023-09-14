import { Schema } from "mongoose"
import { addressSchema, IAddressSchema } from "../../patient-card/common/schemas/address.schema"
import { contactPointSchema, IContactPointSchema } from "../../patient-card/common/schemas/contact-point.schema"
import { humanNameSchema, IHumanNameSchema } from "../../patient-card/common/schemas/human-name.schema"
import { GenderValues } from "../types/gender"
import { contactSchema, IContactSchema } from "./contact.schema"

export interface IPatientSchema {
    _id?: string
    active: boolean
    birthDate: string
    gender: GenderValues
    name: IHumanNameSchema
    address: IAddressSchema[]
    telecom: IContactPointSchema[]
    contact: IContactSchema[],
    createdAt?: Date,
    updatedAt?: Date
}

export const patientSchema = new Schema<IPatientSchema>({
    active: { type: Boolean, required: false, default: true },
    birthDate: { type: String, required: true },
    gender: { type: String, enum: GenderValues, required: true },
    name: { type: humanNameSchema, required: true },
    address: { type: [addressSchema], required: false, default: [] },
    telecom: { type: [contactPointSchema], required: false, default: [] },
    contact: { type: [contactSchema], required: false, default: [] }
}, { timestamps: true })

export const PATIENTS = 'patients'
