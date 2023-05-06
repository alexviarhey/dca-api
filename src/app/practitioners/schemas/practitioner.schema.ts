import { Schema } from "mongoose"
import { contactPointSchema, IContactPointSchema } from "../../common/schemas/contact-point.schema"
import { humanNameSchema, IHumanNameSchema } from "../../common/schemas/human-name.schema"
import { PractitionerCode, PractitionerRole } from "./practitioner-role.schema"
import { GenderValues } from "../../patients/types/gender"


export type PractitionerSchema = {
    _id?: string
    active: boolean
    name: IHumanNameSchema
    gender: GenderValues
    telecom: IContactPointSchema[]
    roles: Array<PractitionerRole>
}

export const practitionerRoleSchema = new Schema<PractitionerRole>({
    code: { type: String, enum: PractitionerCode, required: true },
    speciality: { type: String, nullable: true, default: null },
}, { _id: false })

export const practitionerSchema = new Schema<PractitionerSchema>({
    active: { type: Boolean, default: true },
    name: { type: humanNameSchema, required: true },
    gender: { type: String, enum: GenderValues, required: true },
    telecom: { type: [contactPointSchema], default: [] },
    roles: { type: [practitionerRoleSchema], nullable: false, default: [] }
})

export const PRACTITIONERS_COLLECTION = 'practitioners'
