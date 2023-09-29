import { Schema } from "mongoose"
import { IAddressSchema } from "../../patient-card/common/schemas/address.schema"
import { IContactPointSchema } from "../../patient-card/common/schemas/contact-point.schema"
import { IHumanNameSchema } from "../../patient-card/common/schemas/human-name.schema"
import { GenderValues } from "../types/gender"
import { addressSchema } from "../../patient-card/common/schemas/address.schema"
import { contactPointSchema } from "../../patient-card/common/schemas/contact-point.schema"
import { humanNameSchema } from "../../patient-card/common/schemas/human-name.schema"


export enum ContactRelationship {
    MOTHER = 'mother',
    FATHER = 'father',
    BROTHER = 'brother',
    SISTER = 'sister',
    GRANDMOTHER = 'grandmother',
    GRANDFATHER = 'grandfather',
    CUSTODIAN = 'custodian',
    HUSBAND = 'husband',
    WIFE = 'wife',
    DAUGHTER = 'daughter',
    SON = 'son'
}

export interface IContactSchema {
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
