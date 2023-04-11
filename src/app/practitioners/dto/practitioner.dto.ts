import { AddressDto, CreateAddressDto } from "../../common/dto/adress.dtos"
import { ContactPointDto, CreateContactPointDto } from "../../common/dto/contact-point.dtos"
import { CreateHumanNameDto, HumanNameDto } from "../../common/dto/human-name.dtos"
import { PractitionerRoleDto } from "./practitioner.role.dto"

export type PractitionerDto = {
    _id: string
    active: boolean
    name: HumanNameDto
    telecom: ContactPointDto[]
    address: AddressDto[]
    roles: PractitionerRoleDto[]
}

export type CreatePractitionerDto = {
    name: CreateHumanNameDto
    telecom?: CreateContactPointDto[]
    address?: CreateAddressDto[]
    roles?: string[]
}

export type UpdatePractitionerDto = {
    active?: boolean
    name?: CreateHumanNameDto,
    telecom?: CreateContactPointDto[]
    address?: CreateAddressDto[]
    roles?: string[]
}
