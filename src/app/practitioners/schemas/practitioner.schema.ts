import { Schema } from "mongoose"
import { GenderValues } from "../../patients/types/gender"
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


export interface IPractitioner {
    _id: string
    active: boolean
    name: IHumanNameSchema
    birthDate: string
    gender: GenderValues
    telecom: IContactPointSchema[]
    address?: IAddressSchema[]
    role: IPractitionerRole[]
}


export const practitionerSchema = new Schema<IPractitioner>({
    active: { type: Boolean, required: true },
    name: { type: humanNameSchema, required: true },
    birthDate: { type: String, required: true },
    gender: { type: String, enum: GenderValues, required: true },
    address: { type: [addressSchema], required: true },
    telecom: { type: [contactPointSchema], required: true },
    role: { type: [practitionerRoleSchema], required: true }
})

export const PRACTITIONERS = 'practitioners'
