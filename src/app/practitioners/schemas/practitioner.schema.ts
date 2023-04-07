import { Schema } from "mongoose"
import { addressSchema, IAddressSchema } from "../../common/schemas/address.schema"
import { contactPointSchema, IContactPointSchema } from "../../common/schemas/contact-point.schema"
import { humanNameSchema, IHumanNameSchema } from "../../common/schemas/human-name.schema"

export enum PractitionerCode {
    DOCTOR = 'doctor',
    NURSE = 'nurse',
    ADMINISTRATOR = 'administrator'
}

export enum PractitionerSpeciality {
    SURGEON = 'surgeon',
    ORTHOPEDIST = 'orthopedist',
    ORTHODONTIST = 'orthodontist',
    THERAPIST = 'therapist'
}

interface IPractitionerRole {
    code: PractitionerCode
    speciality: PractitionerSpeciality
    active: boolean
}

const practitionerRoleSchema = new Schema<IPractitionerRole>({
    code: { type: String, enum: PractitionerCode, required: true },
    speciality: { type: String, enum: PractitionerSpeciality, required: true },
    active: { type: Boolean, required: true },
}, { _id: false })

export type PractitionerSchema = {
    _id?: string
    active: boolean
    name: IHumanNameSchema
    telecom: IContactPointSchema[]
    address: IAddressSchema[]
}

export const practitionerSchema = new Schema<PractitionerSchema>({
    active: { type: Boolean, default: true },
    name: { type: humanNameSchema, required: true },
    address: { type: [addressSchema], default: [] },
    telecom: { type: [contactPointSchema], default: [] },
})

export const PRACTITIONERS_COLLECTION = 'practitioners'
