import { TemplateType } from "../schemas/template.schema";
import { ICDDto } from "../../icd/icd.dto";
import { ServiceSubgroupDto, } from "../../price-list/dto/price-list.dtos";


export class CreateTemplateDto {
    icdId?: string
    type: TemplateType
    name: string
    description: string
    subgroupsIds?: string[]
}

export class TemplateDto {
    _id: string
    icd: ICDDto
    type: TemplateType
    name: string
    description: string
    subgroups: ServiceSubgroupDto[]
}
