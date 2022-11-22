import { Mapper } from "../../../core/mapper";
import { IHumanNameSchema } from "../schemas/human-name.schema";
import { CreateHumanNameDto, HumanNameDto } from "../dto/human-name.dtos";

export class HumanNameMapper extends Mapper<IHumanNameSchema, HumanNameDto, CreateHumanNameDto> {
    map(model: IHumanNameSchema): HumanNameDto {
        return {
            firstName: model.firstName,
            lastName: model.lastName,
            given: model.given,
            text: model.text
        };
    }

    mapToSchema(dto: CreateHumanNameDto): IHumanNameSchema {
        const text = dto.lastName + dto.firstName + (dto.given || "");

        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            given: dto.given,
            text
        };
    }
}

export const humanNameMapper = new HumanNameMapper();