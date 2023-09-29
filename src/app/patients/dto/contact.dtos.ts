import {AddressDto, addressValidationSchema, CreateAddressDto} from "../../patient-card/common/dto/adress.dtos"
import {ContactPointDto, contactPointValidationSchema, CreateContactPointDto} from "../../patient-card/common/dto/contact-point.dtos"
import {CreateHumanNameDto, HumanNameDto, humanNameValidationSchema} from "../../patient-card/common/dto/human-name.dtos"
import { ContactRelationship } from "../schemas/contact.schema";
import { GenderValues } from "../types/gender";

export const contactValidationSchema = {
    type: "object",
    required: ["relationship", "name", "gender", "telecom"],
    additionalProperties: false,
    properties: {
        relationship: {
            type: "string",
            enum: Object.values(ContactRelationship),
        },
        name: humanNameValidationSchema,
        gender: {type: "string", enum: Object.values(GenderValues)},
        telecom: {type: "array", items: contactPointValidationSchema, minItems: 1},
        address: {type: "array", items: addressValidationSchema}
    },
}

export class CreateContactDto {
    relationship: ContactRelationship
    name: CreateHumanNameDto
    gender: GenderValues
    telecom: CreateContactPointDto[]
    address?: CreateAddressDto[]
}

export class ContactDto {
    relationship: ContactRelationship
    name: HumanNameDto
    gender: GenderValues
    telecom: ContactPointDto[]
    address: AddressDto[]
}
