import { TemplateType } from "../schemas/template.schema";
import { ICDDto } from "../../icd/icd.dto";
import { ServiceSubgroupDto } from "../../price-list/dto/price-list.dtos";
import { ApiProperty } from "@nestjs/swagger";


export class CreateTemplateDto {
    @ApiProperty({ required: false })
    icdId?: string;

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

    @ApiProperty({ type: () => ICDDto })
    icd: ICDDto;

    @ApiProperty({ enum: TemplateType })
    type: TemplateType;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty({ type: () => ServiceSubgroupDto, isArray: true })
    subgroups: ServiceSubgroupDto[];
}
