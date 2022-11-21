import { ApiProperty } from "@nestjs/swagger";

const costRules = { type: "number", minimum: 0.1 };
const numberRules = { type: "string", pattern: "^\\d*\\d(.\\d*\\d)*$" };
const nameRules = { type: "string", transform: ["trim"], minLength: 3, maxLength: 40 };
const idsRules = { type: "array", items: { type: "string" } };

export const createPriceItemSchema = {
    type: "object",
    properties: {
        name: nameRules,
        itemNumber: numberRules,
        materialsCost: costRules,
        serviceCost: costRules
    },
    allRequired: true,
    additionalProperties: false
};

export const createSubgroupSchema = {
    type: "object",
    properties: {
        subgroupNumber: numberRules,
        name: nameRules,
        priceItemsIds: idsRules
    },
    allRequired: true,
    additionalProperties: false
};

export const createGroupSchema = {
    type: "object",
    properties: {
        groupNumber: numberRules,
        name: nameRules,
        subgroupsIds: idsRules
    },
    allRequired: true,
    additionalProperties: false
};


export type PriceListDto = ServiceGroupWithSubgroupsDto[]


export class CreatePriceItemDto {
    @ApiProperty()
    itemNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    materialsCost: number;

    @ApiProperty()
    serviceCost: number;
}

export class CreateServiceSubgroupDto {
    @ApiProperty()
    subgroupNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    priceItemsIds: string[];
}

export class ServiceSubgroupDto extends CreateServiceSubgroupDto {
    _id: string;
}


export class CreateServiceGroupDto {
    @ApiProperty()
    groupNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    subgroupsIds: string[];
}

export class ServiceGroupDto extends CreateServiceGroupDto {
    _id: string;
}



export class PriceItemDto extends CreatePriceItemDto {
    @ApiProperty()
    _id: string
}

export class ServiceSubgroupWithPriceItemsDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    subgroupNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    materialsCost: number;

    @ApiProperty()
    serviceCost: number;

    @ApiProperty({type: PriceItemDto, isArray: true})
    priceItems: PriceItemDto[];
}

export class ServiceGroupWithSubgroupsDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    groupNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ type: ServiceSubgroupWithPriceItemsDto, isArray: true})
    subgroups: ServiceSubgroupWithPriceItemsDto[];
}

