import { Mapper } from "../../../core/mapper";
import { ITemplateSchema} from "../schemas/template.schema";
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

        const icd = await this.icdCrudUseCase.findOne({ _id: model.icdId });
        const subgroups = await this.subgroupCrudUseCase.find({ _id: { $in: model.serviceSubgroupsIds } });

        return {
            _id: model._id.toString(),
            icd: icd.data,
            type: model.type,
            name: model.name,
            description: model.description,
            subgroups: subgroups.data

        };
    }

    public async mapToSchema(dto: CreateTemplateDto | Partial<CreateTemplateDto>): Promise<ITemplateSchema> {
        return {
            icdId: dto.icdId,
            serviceSubgroupsIds: dto.subgroupsIds,
            type: dto.type,
            name: dto.name,
            description: dto.description
        };
    }

    public async mapArray(models: ITemplateSchema[]): Promise<TemplateDto[]> {
        const icdIds = [];
        const subgroupIds = [];

        models.forEach(m => {
            icdIds.push(m.icdId);
            subgroupIds.concat(m.serviceSubgroupsIds);
        });

        const icds = await this.icdCrudUseCase.find({ _id: { $in: icdIds } });
        const subgroups = await this.subgroupCrudUseCase.find({ _id: { $in: icdIds } });

        const icdsMap = fromArrayToMap(icds.data)
        const subgroupsMap = fromArrayToMap(subgroups.data)

        return models.map(model => ({
            _id: model._id.toString(),
            icd: icdsMap.get(model.icdId),
            type: model.type,
            name: model.name,
            description: model.description,
            subgroups: model.serviceSubgroupsIds.map(id => subgroupsMap.get(id))
        }))
    }
}