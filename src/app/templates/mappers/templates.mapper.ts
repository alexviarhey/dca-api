import { Mapper } from "../../../core/mapper";
import { ITemplateSchema } from "../schemas/template.schema";
import { CreateTemplateDto, TemplateDto } from "../dto/templates.dto";
import { Injectable } from "@nestjs/common";
import { ICDCrudUseCase } from "../../icd/icd.crud-use-case";
import { ServiceSubgroupCrudUseCase } from "../../price-list/use-cases/price-list.crud-use-cases";
import { fromArrayToMap } from "../../../utils/fromArrayToMap";

@Injectable()
export class TemplatesMapper extends Mapper<ITemplateSchema, TemplateDto, CreateTemplateDto> {

    constructor(
        private icdCrudUseCase: ICDCrudUseCase,
        private subgroupCrudUseCase: ServiceSubgroupCrudUseCase
    ) {
        super();
    }


    public async map(model: ITemplateSchema): Promise<TemplateDto> {

        const icds = await this.icdCrudUseCase.find({ _id: { $in: model.icdIds } });
        const subgroups = await this.subgroupCrudUseCase.find({ _id: { $in: model.serviceSubgroupsIds } });

        return {
            _id: model._id.toString(),
            icds: icds.data,
            type: model.type,
            name: model.name,
            description: model.description,
            subgroups: subgroups.data,
            placeholders: model.placeholders
        };
    }

    public async mapToSchema(dto: CreateTemplateDto | Partial<CreateTemplateDto>): Promise<ITemplateSchema> {
        return {
            icdIds: dto.icdIds,
            serviceSubgroupsIds: dto.subgroupsIds,
            type: dto.type,
            name: dto.name,
            description: dto.description,
            placeholders: dto.placeholders
        };
    }

    public async mapArray(models: ITemplateSchema[]): Promise<TemplateDto[]> {
        let icdIds = [];
        let subgroupIds = [];

        models.forEach(m => {
            icdIds = icdIds.concat(m.icdIds);
            subgroupIds = subgroupIds.concat(m.serviceSubgroupsIds);
        });

        const icds = await this.icdCrudUseCase.find({ _id: { $in: icdIds } });
        const subgroups = await this.subgroupCrudUseCase.find({ _id: { $in: subgroupIds} });

        const icdsMap = fromArrayToMap(icds.data);
        const subgroupsMap = fromArrayToMap(subgroups.data);

        return models.map(model => ({
            _id: model._id.toString(),
            icds: model.icdIds.map(id => icdsMap.get(id)),
            type: model.type,
            name: model.name,
            description: model.description,
            subgroups: model.serviceSubgroupsIds.map(id => subgroupsMap.get(id)),
            placeholders: model.placeholders
        }));
    }
}