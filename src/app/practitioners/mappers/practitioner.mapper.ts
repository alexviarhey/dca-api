import { Mapper } from "../../../core/mapper";
import { addressMapper } from "../../common/mappers/address.mapper";
import { contactPointMapper } from "../../common/mappers/contact-point.mapper";
import { humanNameMapper } from "../../common/mappers/human-name.mapper";
import { CreatePractitionerDto, PractitionerDto } from "../dto/practitioner.dto";
import { PractitionerSchema } from "../schemas/practitioner.schema";


export class PractitionersMapper extends Mapper<PractitionerSchema, PractitionerDto, CreatePractitionerDto> {
    public async map(model: PractitionerSchema): Promise<PractitionerDto> {
        return {
            _id: model._id.toString(),
            active: model.active,
            name: await humanNameMapper.map(model.name),
            telecom: await contactPointMapper.mapArray(model.telecom),
            address: await addressMapper.mapArray(model.address)
        }
    }

    async mapToSchema(dto: CreatePractitionerDto): Promise<PractitionerSchema> {
        const telecom = dto.telecom
        const address = dto.address

        return {
            active: true,
            name: await humanNameMapper.mapToSchema(dto.name),
            telecom: telecom ? await contactPointMapper.mapToSchemaArray(dto.telecom) : [],
            address: address ? await addressMapper.mapToSchemaArray(dto.address) : []
        }
    }
}

export const practitionersMapper = new PractitionersMapper()
