import { ContactPointDto, CreateContactPointDto, contactPointValidationSchema } from "../../patient-card/common/dto/contact-point.dtos"
import { CreateHumanNameDto, HumanNameDto, humanNameValidationSchema } from "../../patient-card/common/dto/human-name.dtos"
import { GenderValues } from "../../patients/types/gender";
import { PractitionerRoleDto } from "./practitioner.role.dto"

export const getPractitionersFiltersSchema = {
    type: 'object',
    additionalProperties: false,
    properties: {
        page: { type: "number", minimum: 0 },
        size: { type: "number", minimum: 1 },
        name: { type: "string" },
        address: { type: "string" },
        active: { type: "boolean" },
        phone: { type: "string" },
        code: { type: "string" },
        speciality: { type: "string" }
    }
}

export const createPractitionerSchema = {
    type: "object",
    required: ["name", "telecom", "roles", "gender"],
    properties: {
        name: humanNameValidationSchema,
        gender: { type: "string", enum: Object.values(GenderValues) },
        telecom: { type: "array", items: contactPointValidationSchema },
        roles: {
            type: 'array',
            items: {
                type: 'object',
                required: ["code", "speciality"],
                additionalProperties: false,
                properties: {
                    code: { type: 'string'},
                    speciality: { type: 'string', nullable: true },
                }
            }

        }
    },
    additionalProperties: false
};

export const updatePractitionerSchema = {
    ...createPractitionerSchema,
    properties: {
        ...createPractitionerSchema.properties,
        id: { type: "string" },
        active: { type: "boolean" }
    },
    required: ["id"],
    additionalProperties: false
};

export type PractitionerDto = {
    _id: string
    active: boolean
    gender: GenderValues
    name: HumanNameDto
    telecom: ContactPointDto[]
    roles: PractitionerRoleDto[]
}

export type CreatePractitionerDto = {
    name: CreateHumanNameDto
    gender: GenderValues
    telecom: CreateContactPointDto[]
    roles: PractitionerRoleDto[]
}

export type UpdatePractitionerDto = {
    id: string
    active?: boolean
    gender?: GenderValues
    name?: CreateHumanNameDto,
    telecom?: CreateContactPointDto[]
    roles?: PractitionerRoleDto[]
}

export type GetPractitionersFilters = {
    page?: number
    size?: number
    name?: string
    address?: string
    active?: number
    phone?: string
    code?: string
    speciality?: string
}
