import { Mapper } from "../../../core/mapper";
import { contactPointMapper } from "../../patient-card/common/mappers/contact-point.mapper";
import { humanNameMapper } from "../../patient-card/common/mappers/human-name.mapper";
import { GenderValues } from "../../patients/types/gender";
import { CreatePractitionerDto, PractitionerDto } from "../dto/practitioner.dto";
import { PractitionerSchema } from "../schemas/practitioner.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PractitionersMapper extends Mapper<PractitionerSchema, PractitionerDto, CreatePractitionerDto> {
    constructor() {
        super()
    }

    public async map(model: PractitionerSchema): Promise<PractitionerDto> {

        return {
            _id: model._id.toString(),
            active: model.active,
            gender: model.gender,
            name: await humanNameMapper.map(model.name),
            telecom: await contactPointMapper.mapArray(model.telecom),
            roles: model.roles
        }
    }

    async mapToSchema(dto: CreatePractitionerDto): Promise<PractitionerSchema> {
        const telecom = dto.telecom

        return {
            active: true,
            gender: dto.gender,
            name: await humanNameMapper.mapToSchema(dto.name),
            telecom: telecom ? await contactPointMapper.mapToSchemaArray(dto.telecom) : [],
            roles: dto.roles
        }
    }
}
