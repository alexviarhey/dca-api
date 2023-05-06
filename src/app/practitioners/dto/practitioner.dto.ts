import { ContactPointDto, CreateContactPointDto, contactPointValidationSchema } from "../../common/dto/contact-point.dtos"
import { CreateHumanNameDto, HumanNameDto, humanNameValidationSchema } from "../../common/dto/human-name.dtos"
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
        phone: { type: "string" }
    }
}

export const createPractitionerSchema = {
    type: "object",
    required: ["name", "telecom", "roles"],
    properties: {
        name: humanNameValidationSchema,
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
    additionalProperties: true
};

export type PractitionerDto = {
    _id: string
    active: boolean
    name: HumanNameDto
    telecom: ContactPointDto[]
    roles: PractitionerRoleDto[]
}

export type CreatePractitionerDto = {
    name: CreateHumanNameDto
    telecom: CreateContactPointDto[]
    roles: PractitionerRoleDto[]
}

export type UpdatePractitionerDto = {
    active?: boolean
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
}
