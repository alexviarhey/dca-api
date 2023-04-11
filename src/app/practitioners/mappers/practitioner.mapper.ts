import { Model } from "mongoose";
import { Mapper } from "../../../core/mapper";
import { addressMapper } from "../../common/mappers/address.mapper";
import { contactPointMapper } from "../../common/mappers/contact-point.mapper";
import { humanNameMapper } from "../../common/mappers/human-name.mapper";
import { CreatePractitionerDto, PractitionerDto } from "../dto/practitioner.dto";
import { PractitionerRoleDto } from "../dto/practitioner.role.dto";
import { PRACTITIONERS_ROLES_COLLECTIONS, PractitionerRoleSchema } from "../schemas/practitioner-role.schema";
import { PractitionerSchema } from "../schemas/practitioner.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PractitionersMapper extends Mapper<PractitionerSchema, PractitionerDto, CreatePractitionerDto> {
    constructor(
        @InjectModel(PRACTITIONERS_ROLES_COLLECTIONS)
        private readonly practitionerModel: Model<PractitionerRoleSchema>,
    ) {
        super()
    }

    public async map(model: PractitionerSchema): Promise<PractitionerDto> {

        let roles = await this.practitionerModel.find({
            where: {
                id: { $in: model.roles }
            }
        })

        let rolesDto: Array<PractitionerRoleDto> = roles.map(r => ({
            code: r.code,
            speciality: r.speciality
        }))

        return {
            _id: model._id.toString(),
            active: model.active,
            name: await humanNameMapper.map(model.name),
            telecom: await contactPointMapper.mapArray(model.telecom),
            address: await addressMapper.mapArray(model.address),
            roles: rolesDto
        }
    }

    async mapToSchema(dto: CreatePractitionerDto): Promise<PractitionerSchema> {
        const telecom = dto.telecom
        const address = dto.address

        return {
            active: true,
            name: await humanNameMapper.mapToSchema(dto.name),
            telecom: telecom ? await contactPointMapper.mapToSchemaArray(dto.telecom) : [],
            address: address ? await addressMapper.mapToSchemaArray(dto.address) : [],
            roles: dto.roles
        }
    }
}
