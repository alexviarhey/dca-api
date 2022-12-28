import { TemplateType } from "../schemas/template.schema";
import { ICDDto } from "../../icd/icd.dto";
import { ServiceSubgroupDto } from "../../price-list/dto/price-list.dtos";
import { ApiProperty } from "@nestjs/swagger";

export const createTemplateSchema = {
    type: "object",
    required: ['type', 'name', 'description'],
    additionalProperties: false,
    properties: {
        icdIds: { type: 'array', items: { type: 'string' } },
        name: { type: 'string', transform: ['trim'], minLength: 3 },
        type: { enum: Object.values(TemplateType) },
        description: { type: 'string', transform: ['trim'], minLength: 3 },
        subgroupsIds: { type: 'array', items: { type: 'string' } },
    },
}

export class CreateTemplateDto {
    @ApiProperty({ required: false, isArray: true })
    icdIds?: string[];

    @ApiProperty({ enum: TemplateType })
    type: TemplateType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ required: false, isArray: true })
    subgroupsIds?: string[];
}

export class TemplateDto {
    @ApiProperty()
    _id: string;

    @ApiProperty({ type: () => ICDDto, isArray: true })
    icds: ICDDto[];

    @ApiProperty({ enum: TemplateType })
    type: TemplateType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: () => ServiceSubgroupDto, isArray: true })
    subgroups: ServiceSubgroupDto[];
}
