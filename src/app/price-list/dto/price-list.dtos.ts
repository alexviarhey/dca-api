import { ApiProperty } from "@nestjs/swagger";

const numberRules = { type: "string", pattern: "^\\d*\\d(.\\d*\\d)*$" };
const nameRules = { type: "string", transform: ["trim"], minLength: 3, maxLength: 40 };
const idsRules = { type: "array", items: { type: "string" } };

export const createPriceItemSchema = {
    type: "object",
    properties: {
        name: nameRules,
        itemNumber: numberRules,
        materialsCost: { type: "number", minimum: 0.1 },
        serviceCost: { type: "number", minimum: 0 }
    },
    allRequired: true,
    additionalProperties: false
};

export const createSubgroupSchema = {
    type: "object",
    properties: {
        subgroupNumber: numberRules,
        name: nameRules,
        priceItemsIds: idsRules,
        groupId: { type: "string" }
    },
    required: ["name", "subgroupNumber", "priceItemsIds"],
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

    @ApiProperty({ required: false })
    groupId?: string;

}

export class ServiceSubgroupDto extends CreateServiceSubgroupDto {
    @ApiProperty()
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
    @ApiProperty()
    _id: string;
}



export class PriceItemDto extends CreatePriceItemDto {
    @ApiProperty()
    _id: string

    @ApiProperty()
    totalCost: number
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

    @ApiProperty()
    totalCost: number;

    @ApiProperty({ type: PriceItemDto, isArray: true })
    priceItems: PriceItemDto[];
}

export class ServiceGroupWithSubgroupsDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    groupNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ type: ServiceSubgroupWithPriceItemsDto, isArray: true })
    subgroups: ServiceSubgroupWithPriceItemsDto[];
}


export class UpdatePriceItemDto {
    @ApiProperty()
    _id: string

    @ApiProperty({ required: false })
    itemNumber?: string;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    materialsCost?: number;

    @ApiProperty({ required: false })
    serviceCost?: number;
}

export const updatePriceItemShema = {
    ...createPriceItemSchema,
    requredAll: false,
    required: ["_id"],
    properties: {
        ...createPriceItemSchema.properties,
        _id: { type: "string" }
    }
}
