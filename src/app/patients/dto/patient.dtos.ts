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


export const patientValidationSchema = {
    type: "object",
    required: ["birthDate", "gender", "name"],
    properties: {
        birthDate: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
        gender: { type: "string", enum: Object.values(GenderValues) },
        name: humanNameValidationSchema,
        telecom: { type: "array", items: contactPointValidationSchema },
        address: { type: "array", items: addressValidationSchema },
        contact: { type: "array", items: contactValidationSchema }
    },
    additionalProperties: false
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
}


export class UpdatePatientDto extends CreatePatientDto {
    @ApiProperty()
    _id: string;
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
