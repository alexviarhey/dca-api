import { Mapper } from "../../../core/mapper";
import { IPatientSchema } from "../schemas/patient.schema";
import { CreatePatientDto, PatientDto } from "../dto/patient.dtos";
import { ContactDto, CreateContactDto } from "../dto/contact.dtos";
import { humanNameMapper } from "../../common/mappers/human-name.mapper";
import { addressMapper } from "../../common/mappers/address.mapper";
import { contactPointMapper } from "../../common/mappers/contact-point.mapper";
import { IContactSchema } from "../schemas/contact.schema";

class ContactMapper extends Mapper<IContactSchema, ContactDto, CreateContactDto> {
    map(model: IContactSchema): ContactDto {
        return {
            _id: model._id.toString(),
            gender: model.gender,
            relationship: model.relationship,
            name: humanNameMapper.map(model.name),
            address: addressMapper.mapArray(model.address),
            telecom: contactPointMapper.mapArray(model.telecom)
        };
    }

    mapToSchema(dto: CreateContactDto): IContactSchema {
        return {
            gender: dto.gender,
            relationship: dto.relationship,
            name: humanNameMapper.mapToSchema(dto.name),
            address: addressMapper.mapToSchemaArray(dto.address),
            telecom: contactPointMapper.mapToSchemaArray(dto.telecom)
        };
    }
}

const contactMapper = new ContactMapper();

class PatientMapper extends Mapper<IPatientSchema, PatientDto, CreatePatientDto> {
    map(model: IPatientSchema) {
        return {
            _id: model._id.toString(),
            active: model.active,
            birthDate: model.birthDate,
            gender: model.gender,
            name: humanNameMapper.map(model.name),
            address: addressMapper.mapArray(model.address),
            telecom: contactPointMapper.mapArray(model.telecom),
            contact: contactMapper.mapArray(model.contact)
        };
    }

    mapToSchema(dto: CreatePatientDto): IPatientSchema {
        return {
            //By default all patients is active
            active: true,
            birthDate: dto.birthDate,
            gender: dto.gender,
            name: humanNameMapper.mapToSchema(dto.name),
            address: addressMapper.mapToSchemaArray(dto.address),
            telecom: contactPointMapper.mapToSchemaArray(dto.telecom),
            contact: contactMapper.mapToSchemaArray(dto.contact)
        };
    }
}

export const patientMapper = new PatientMapper();



