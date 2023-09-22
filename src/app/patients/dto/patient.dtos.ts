import { AddressDto, addressValidationSchema, CreateAddressDto } from "../../patient-card/common/dto/adress.dtos";
import {
    ContactPointDto,
    contactPointValidationSchema,
    CreateContactPointDto
} from "../../patient-card/common/dto/contact-point.dtos";
import { ContactDto, contactValidationSchema, CreateContactDto } from "./contact.dtos";
import { CreateHumanNameDto, HumanNameDto, humanNameValidationSchema } from "../../patient-card/common/dto/human-name.dtos";
import { GenderValues } from "../types/gender";

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
        contact: { type: "array", items: contactValidationSchema },
        passportData: {
            passportNumber: { type: "string" },
            dateOfIssue: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
            authority: { type: "string" }
        }
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
    allRequired: true,
    additionalProperties: false,
    properties: {
        _id: { type: "string" }
    }
};

export const patientPassportDataSchema = {
    type: "object",
    allRequired: true,
    additionalProperties: false,
    properties: {
        passportNumber: { type: "string" },
        dateOfIssue: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
        authority: { type: "string" }
    }
};

export type CreatePatientDto = {
    birthDate: string
    gender: GenderValues
    name: CreateHumanNameDto
    telecom?: CreateContactPointDto[]
    address?: CreateAddressDto[]
    contact?: CreateContactDto[]
    active?: boolean
    passportData?: PatientPassportDataDto
}

export type UpdatePatientDto = {
    _id: string
    birthDate?: string
    gender?: GenderValues
    name?: CreateHumanNameDto
    telecom?: CreateContactPointDto[]
    address?: CreateAddressDto[]
    contact?: CreateContactDto[]
    passportData?: PatientPassportDataDto
}

export type PatientDto = {
    _id: string
    active: boolean
    birthDate: string
    gender: GenderValues
    name: HumanNameDto
    address: AddressDto[]
    telecom: ContactPointDto[]
    contact: ContactDto[]
    passportData: PatientPassportDataDto | null
    createdAt: Date
    updatedAt: Date
}

export type InactivatePatientDto = {
    _id: string
}

export type PatientPassportDataDto = {
    passportNumber: string
    dateOfIssue: Date
    authority: string
}
