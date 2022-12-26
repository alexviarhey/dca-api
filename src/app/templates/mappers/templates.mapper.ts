import { Mapper } from "../../../core/mapper";
import { ITemplateSchema, TemplateType } from "../schemas/template.schema";
import { CreateTemplateDto, TemplateDto } from "../dto/templates.dto";
import { ICDDto } from "../../icd/icd.dto";
import { ServiceSubgroupWithPriceItemsDto } from "../../price-list/dto/price-list.dtos";


export class TemplatesMapper extends Mapper<ITemplateSchema, TemplateDto, CreateTemplateDto> {

    async map(model: ITemplateSchema): TemplateDto {



        return {
            _id: model._id.toString(),
            icd: model.icdId,
            type: TemplateType
            name: string
            description: string
            subgroups: ServiceSubgroupWithPriceItemsDto[]

        }
    }

    mapToSchema(dto: Partial<CreateTemplateDto> | CreateTemplateDto): ITemplateSchema {
        return undefined;
    }

}