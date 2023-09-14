import { Mapper } from "../../../../core/mapper";
import { IContactPointSchema } from "../schemas/contact-point.schema";
import { ContactPointDto, CreateContactPointDto } from "../dto/contact-point.dtos";


export class ContactPointMapper extends Mapper<IContactPointSchema, ContactPointDto, CreateContactPointDto> {
    async map(model: IContactPointSchema) {
       return {
           system: model.system,
           use: model.use,
           value: model.value,
       }
    }

    async mapToSchema(dto: CreateContactPointDto){
        return {
            value: dto.value,
            use: dto.use,
            system: dto.system
        }
    }
}

export const contactPointMapper = new ContactPointMapper()
