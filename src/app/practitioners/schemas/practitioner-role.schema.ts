import { Schema } from "mongoose"

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

export type PractitionerRoleSchema = {
    code: PractitionerCode
    speciality?: PractitionerSpeciality
    active: boolean
}

export const practitionerRoleSchema = new Schema<PractitionerRoleSchema>({
    code: { type: String, enum: PractitionerCode, required: true },
    speciality: { type: String, enum: PractitionerSpeciality, required: false, nullable: true, default: null },
    active: { type: Boolean, required: true },
})

export const PRACTITIONERS_ROLES_COLLECTIONS = 'practitioners_roles'
