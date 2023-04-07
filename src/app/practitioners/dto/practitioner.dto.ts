import { AddressDto, CreateAddressDto } from "../../common/dto/adress.dtos"
import { ContactPointDto, CreateContactPointDto } from "../../common/dto/contact-point.dtos"
import { CreateHumanNameDto, HumanNameDto } from "../../common/dto/human-name.dtos"

export type PractitionerDto = {
    _id: string
    active: boolean
    name: HumanNameDto
    telecom: ContactPointDto[]
    address: AddressDto[]
}

export type CreatePractitionerDto = {
    name: CreateHumanNameDto
    telecom?: CreateContactPointDto[]
    address?: CreateAddressDto[]
}

export type UpdatePractitionerDto = {
    active?: boolean
    name?: CreateHumanNameDto,
    telecom?: CreateContactPointDto[]
    address?: CreateAddressDto[]
}
