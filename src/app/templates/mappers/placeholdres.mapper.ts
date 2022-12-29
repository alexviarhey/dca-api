import { Mapper } from "../../../core/mapper";
import { ITemplatePlaceholder } from "../schemas/placeholder";
import { CreatePlaceholderDto, PlaceholderDto } from "../dto/placeholders.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlaceholdersMapper  extends Mapper<ITemplatePlaceholder, PlaceholderDto, CreatePlaceholderDto> {
    async map(model: ITemplatePlaceholder): Promise<PlaceholderDto> {
        return {
            _id: model._id.toString(),
            name: model.name,
            placeholder: model.placeholder
        }
    }

    async mapToSchema(dto: Partial<CreatePlaceholderDto> | CreatePlaceholderDto): Promise<ITemplatePlaceholder> {
        return {
            name: dto.name,
            placeholder: dto.placeholder
        }
    }
}