import { Mapper } from "../../core/mapper";
import { IHumanNameSchema } from "../schemas/human-name.schema";
import { HumanNameDto } from "../dto/human-name.dtos";

export class HumanNameMapper extends Mapper<IHumanNameSchema, HumanNameDto> {
    map(model: IHumanNameSchema): HumanNameDto {
        const text = model.lastName + model.firstName + (model.given || "")
        return {
            firstName: model.firstName,
            lastName: model.lastName,
            given: model.given,
            text
        }
    }
}

export const humanNameMapper = new HumanNameMapper()