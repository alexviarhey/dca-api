import { TemplateType } from "../schemas/template.schema";
import { ICDDto } from "../../icd/icd.dto";
import { ServiceSubgroupDto } from "../../price-list/dto/price-list.dtos";
import { ApiProperty } from "@nestjs/swagger";
import { PaginatedFilters } from "../../../core/paginated";

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

export const updateTemplateSchema = {
    ...createTemplateSchema,
    required: ['_id'],
    properties: {
        _id: { type: 'string' },
        ...createTemplateSchema
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

export class UpdateTemplateDto {
    @ApiProperty()
    _id: string

    @ApiProperty({ required: false, isArray: true })
    icdIds?: string[];

    @ApiProperty({required: false, enum: TemplateType })
    type?: TemplateType;

    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({required: false})
    description?: string;

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


export class GetTemplatesFilters extends PaginatedFilters {

    @ApiProperty({ required: false })
    searchQuery?: string

    @ApiProperty({ required: false, enum: TemplateType })
    type?: TemplateType

    @ApiProperty({ required: false, isArray: true })
    icdIds: string[]
}