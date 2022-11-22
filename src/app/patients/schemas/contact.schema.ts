import { Schema } from "mongoose"
import { IAddressSchema } from "../../common/schemas/address.schema"
import { IContactPointSchema } from "../../common/schemas/contact-point.schema"
import { IHumanNameSchema } from "../../common/schemas/human-name.schema"
import { GenderValues } from "../types/gender"
import { addressSchema } from "../../common/schemas/address.schema"
import { contactPointSchema } from "../../common/schemas/contact-point.schema"
import { humanNameSchema } from "../../common/schemas/human-name.schema"


export enum ContactRelationship {
    MOTHER = 'mother',
    FATHER = 'father',
    BROTHER = 'brother',
    SISTER = 'sister',
    GRANDMOTHER = 'grandmother',
    GRANDFATHER = 'grandfather',
    CUSTODIAN = 'custodian'
}

export interface IContactSchema {
    _id?: string
    relationship: ContactRelationship,
    gender: GenderValues
    name: IHumanNameSchema
    address: IAddressSchema[]
    telecom: IContactPointSchema[]
}


export const contactSchema = new Schema<IContactSchema>({
    relationship: { type: String, enum: ContactRelationship, required: true },
    gender: { type: String, enum: GenderValues, required: true },
    name: { type: humanNameSchema, required: true },
    address: { type: [addressSchema], required: false, default: [] },
    telecom: { type: [contactPointSchema], required: true }
}, { _id: false })

