import {AddressDto, addressValidationSchema, CreateAddressDto} from "../../common/dto/adress.dtos"
import {ContactPointDto, contactPointValidationSchema, CreateContactPointDto} from "../../common/dto/contact-point.dtos"
import {CreateHumanNameDto, HumanNameDto, humanNameValidationSchema} from "../../common/dto/human-name.dtos"
import { ContactRelationship } from "../schemas/contact.schema";
import { GenderValues } from "../types/gender";
import { ApiProperty } from "@nestjs/swagger";

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
    @ApiProperty({ enum: ContactRelationship })
    relationship: ContactRelationship

    @ApiProperty({ type: CreateHumanNameDto})
    name: CreateHumanNameDto

    @ApiProperty({ enum: GenderValues})
    gender: GenderValues

    @ApiProperty({ type: CreateContactPointDto, isArray: true})
    telecom: CreateContactPointDto[]

    @ApiProperty({ type: CreateAddressDto, isArray: true, required: false})
    address?: CreateAddressDto[]
}

export class ContactDto {
    @ApiProperty({enum: ContactRelationship})
    relationship: ContactRelationship

    @ApiProperty({type: HumanNameDto})
    name: HumanNameDto

    @ApiProperty({enum: GenderValues})
    gender: GenderValues

    @ApiProperty({type: ContactPointDto, isArray: true})
    telecom: ContactPointDto[]

    @ApiProperty({type: AddressDto, isArray: true})
    address: AddressDto[]
}
