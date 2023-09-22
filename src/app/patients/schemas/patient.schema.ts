import { Schema } from "mongoose"
import { addressSchema, IAddressSchema } from "../../patient-card/common/schemas/address.schema"
import { contactPointSchema, IContactPointSchema } from "../../patient-card/common/schemas/contact-point.schema"
import { humanNameSchema, IHumanNameSchema } from "../../patient-card/common/schemas/human-name.schema"
import { GenderValues } from "../types/gender"
import { contactSchema, IContactSchema } from "./contact.schema"

export type PatientPassportData = {
    passportNumber: string | null
    dateOfIssue: Date | null
    authority: string | null
}

export interface IPatientSchema {
    _id?: string
    active: boolean
    birthDate: string
    gender: GenderValues
    name: IHumanNameSchema
    address: IAddressSchema[]
    telecom: IContactPointSchema[]
    contact: IContactSchema[],
    passportData: PatientPassportData | null
    createdAt?: Date
    updatedAt?: Date
}

const passportDataSchema = new Schema<PatientPassportData>({
    passportNumber: { type: String, required: false, default: null },
    dateOfIssue: { type: Date, required: false, default: null },
    authority: { type: String, required: false, default: null },
})

export const patientSchema = new Schema<IPatientSchema>({
    active: { type: Boolean, required: false, default: true },
    birthDate: { type: String, required: true },
    gender: { type: String, enum: GenderValues, required: true },
    name: { type: humanNameSchema, required: true },
    address: { type: [addressSchema], required: false, default: [] },
    telecom: { type: [contactPointSchema], required: false, default: [] },
    contact: { type: [contactSchema], required: false, default: [] },
    passportData: { type: passportDataSchema, required: false, default: null }
}, { timestamps: true })

export const PATIENTS = 'patients'
