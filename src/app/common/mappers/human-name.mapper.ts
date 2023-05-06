import { Mapper } from "../../../core/mapper";
import { IHumanNameSchema } from "../schemas/human-name.schema";
import { CreateHumanNameDto, HumanNameDto } from "../dto/human-name.dtos";

export class HumanNameMapper extends Mapper<IHumanNameSchema, HumanNameDto, CreateHumanNameDto> {
    async map(model: IHumanNameSchema): Promise<HumanNameDto> {
        return {
            firstName: model.firstName,
            lastName: model.lastName,
            given: model.given,
            text: model.text
        };
    }

    async mapToSchema(dto: CreateHumanNameDto): Promise<IHumanNameSchema> {
        const text = dto.lastName + " " + dto.firstName + " " + (dto.given || "");

        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            given: dto.given,
            text
        };
    }
}

export const humanNameMapper = new HumanNameMapper();
