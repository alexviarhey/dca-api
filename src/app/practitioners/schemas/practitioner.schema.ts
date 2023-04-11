import { Schema } from "mongoose"
import { addressSchema, IAddressSchema } from "../../common/schemas/address.schema"
import { contactPointSchema, IContactPointSchema } from "../../common/schemas/contact-point.schema"
import { humanNameSchema, IHumanNameSchema } from "../../common/schemas/human-name.schema"


export type PractitionerSchema = {
    _id?: string
    active: boolean
    name: IHumanNameSchema
    telecom: IContactPointSchema[]
    address: IAddressSchema[]
    roles: Array<string>
}

export const practitionerSchema = new Schema<PractitionerSchema>({
    active: { type: Boolean, default: true },
    name: { type: humanNameSchema, required: true },
    address: { type: [addressSchema], default: [] },
    telecom: { type: [contactPointSchema], default: [] },
    roles: { type: [String], nullable: false, default: [] }
})

export const PRACTITIONERS_COLLECTION = 'practitioners'
