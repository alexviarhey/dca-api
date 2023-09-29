import { Mapper } from "../../../core/mapper";
import { IPatientSchema } from "../schemas/patient.schema";
import { CreatePatientDto, PatientDto } from "../dto/patient.dtos";
import { ContactDto, CreateContactDto } from "../dto/contact.dtos";
import { humanNameMapper } from "../../patient-card/common/mappers/human-name.mapper";
import { addressMapper } from "../../patient-card/common/mappers/address.mapper";
import { contactPointMapper } from "../../patient-card/common/mappers/contact-point.mapper";
import { IContactSchema } from "../schemas/contact.schema";

class ContactMapper extends Mapper<IContactSchema, ContactDto, CreateContactDto> {
    async map(model: IContactSchema): Promise<ContactDto> {
        return {
            gender: model.gender,
            relationship: model.relationship,
            name: await humanNameMapper.map(model.name),
            address: await addressMapper.mapArray(model.address),
            telecom: await contactPointMapper.mapArray(model.telecom)
        };
    }

    async mapToSchema(dto: CreateContactDto): Promise<IContactSchema> {
        return {
            gender: dto.gender,
            relationship: dto.relationship,
            name: await humanNameMapper.mapToSchema(dto.name),
            address: await addressMapper.mapToSchemaArray(dto.address),
            telecom: await contactPointMapper.mapToSchemaArray(dto.telecom)
        };
    }
}

const contactMapper = new ContactMapper();

class PatientMapper extends Mapper<IPatientSchema, PatientDto, CreatePatientDto> {
    async map(model: IPatientSchema): Promise<PatientDto> {
        return {
            _id: model._id.toString(),
            active: model.active,
            birthDate: model.birthDate,
            gender: model.gender,
            name: await humanNameMapper.map(model.name),
            address: await addressMapper.mapArray(model.address),
            telecom: await contactPointMapper.mapArray(model.telecom),
            contact: await contactMapper.mapArray(model.contact),
            passportData: model.passportData,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
        };
    }

    async mapToSchema(dto: CreatePatientDto): Promise<IPatientSchema> {
        return {
            //By default all patients is active
            active: dto.active !== undefined ? true : dto.active,
            birthDate: dto.birthDate,
            gender: dto.gender,
            name: await humanNameMapper.mapToSchema(dto.name),
            address: await addressMapper.mapToSchemaArray(dto.address),
            telecom: await contactPointMapper.mapToSchemaArray(dto.telecom),
            contact: dto.contact?.length ? await contactMapper.mapToSchemaArray(dto.contact) : [],
            passportData: dto.passportData ?? null
        };
    }
}

export const patientMapper = new PatientMapper();
