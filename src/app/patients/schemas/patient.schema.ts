import { Schema } from "mongoose"
import { addressSchema, IAddressSchema } from "../../common/schemas/address.schema"
import { contactPointSchema, IContactPointSchema } from "../../common/schemas/contact-point.schema"
import { humanNameSchema, IHumanNameSchema } from "../../common/schemas/human-name.schema"
import { GenderValues } from "../types/gender"
import { contactSchema, IContactSchema } from "./contact.schema"

export interface IPatientSchema {
    _id: string
    active: boolean
    birthDate: string
    gender: GenderValues
    name: IHumanNameSchema
    address: IAddressSchema[]
    telecom: IContactPointSchema[]
    contact: IContactSchema[]
}

export const patientSchema = new Schema<IPatientSchema>({
    active: { type: Boolean, required: false, default: true },
    birthDate: { type: String, required: true },
    gender: { type: String, enum: GenderValues, required: true },
    name: { type: humanNameSchema, required: true },
    address: { type: [addressSchema], required: false, default: []},
    telecom: { type: [contactPointSchema], required: false, default: []},
    contact: { type: [contactSchema], required: false, default: []}
})

export const PATIENTS = 'patients'
