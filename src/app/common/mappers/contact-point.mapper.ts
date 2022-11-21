import { Mapper } from "../../core/mapper";
import { IContactPointSchema } from "../schemas/contact-point.schema";
import { ContactPointDto } from "../dto/contact-point.dtos";


export class ContactPointMapper extends Mapper<IContactPointSchema, ContactPointDto> {
    map(model: IContactPointSchema): ContactPointDto {
       return {
           system: model.system,
           use: model.use,
           value: model.value,
       }
    }
}

export const contactPointMapper = new ContactPointMapper()