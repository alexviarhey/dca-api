import { Mapper } from "../../core/mapper";
import { IPatientSchema } from "../schemas/patient.schema";
import { PatientDto } from "../dto/patient.dtos";
import { ContactDto } from "../dto/contact.dtos";
import { humanNameMapper} from "../../common/mappers/human-name.mapper";
import { addressMapper } from "../../common/mappers/address.mapper";
import { contactPointMapper } from "../../common/mappers/contact-point.mapper";
import { IContactSchema } from "../schemas/contact.schema";

class ContactMapper extends Mapper<IContactSchema, ContactDto> {
   map(model: IContactSchema): ContactDto {
        return {
            _id: model._id.toString(),
            gender: model.gender,
            relationship: model.relationship,
            name: humanNameMapper.map(model.name),
            address: addressMapper.mapArray(model.address),
            telecom: contactPointMapper.mapArray(model.telecom),
        }
    }
}

const contactMapper = new ContactMapper()

class PatientMapper extends Mapper<IPatientSchema, PatientDto> {
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
        }
    }
}

export const patientMapper = new PatientMapper()



