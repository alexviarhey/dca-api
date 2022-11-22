import { AddressDto, addressValidationSchema, CreateAddressDto } from "../../common/dto/adress.dtos";
import {
    ContactPointDto,
    contactPointValidationSchema,
    CreateContactPointDto
} from "../../common/dto/contact-point.dtos";
import { ContactDto, contactValidationSchema, CreateContactDto } from "./contact.dtos";
import { CreateHumanNameDto, HumanNameDto, humanNameValidationSchema } from "../../common/dto/human-name.dtos";
import { GenderValues } from "../types/gender";
import { ApiProperty } from "@nestjs/swagger";


export const createPatientValidationSchema = {
    type: "object",
    required: ["birthDate", "gender", "name"],
    properties: {
        birthDate: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
        gender: { type: "string", enum: Object.values(GenderValues) },
        name: humanNameValidationSchema,
        active: { type: 'boolean' },
        telecom: { type: "array", items: contactPointValidationSchema },
        address: { type: "array", items: addressValidationSchema },
        contact: { type: "array", items: contactValidationSchema }
    },
    additionalProperties: false
};

export const updatePatientValidationSchema = {
    ...createPatientValidationSchema,
    properties: {
        ...createPatientValidationSchema.properties,
        _id: { type: "string" }
    },
    required: ["_id"]
};

export const inactivatePatientSchema = {
    type: "object",
    requiredAll: true,
    additionalProperties: false,
    properties: {
        _id: { type: "string" }
    }
};


export class CreatePatientDto {
    @ApiProperty()
    birthDate: string;

    @ApiProperty({ enum: GenderValues })
    gender: GenderValues;

    @ApiProperty({ type: CreateHumanNameDto })
    name: CreateHumanNameDto;

    @ApiProperty({ type: CreateContactPointDto, isArray: true, required: false })
    telecom?: CreateContactPointDto[];

    @ApiProperty({ type: CreateAddressDto, isArray: true, required: false })
    address?: CreateAddressDto[];

    @ApiProperty({ type: CreateContactDto, isArray: true, required: false })
    contact?: CreateContactDto[];

    @ApiProperty({required: false })
    active?: boolean;
}



export class UpdatePatientDto {
    @ApiProperty()
    _id: string;

    @ApiProperty({required: false})
    birthDate?: string;

    @ApiProperty({ enum: GenderValues, required: false })
    gender?: GenderValues;

    @ApiProperty({ type: CreateHumanNameDto, required: false })
    name?: CreateHumanNameDto;

    @ApiProperty({ type: CreateContactPointDto, isArray: true, required: false })
    telecom?: CreateContactPointDto[];

    @ApiProperty({ type: CreateAddressDto, isArray: true, required: false })
    address?: CreateAddressDto[];

    @ApiProperty({ type: CreateContactDto, isArray: true, required: false })
    contact?: CreateContactDto[];
}

export class PatientDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    active: boolean;

    @ApiProperty()
    birthDate: string;

    @ApiProperty({enum: GenderValues})
    gender: GenderValues;

    @ApiProperty({type: HumanNameDto})
    name: HumanNameDto;

    @ApiProperty({type: AddressDto, isArray: true})
    address: AddressDto[];

    @ApiProperty({type: ContactPointDto, isArray: true})
    telecom: ContactPointDto[];

    @ApiProperty({type: ContactDto, isArray: true})
    contact: ContactDto[];
}

export class InactivatePatientDto {
    @ApiProperty()
    _id: string
}