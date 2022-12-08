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
        priceItems: { type: 'array', items: { type: "object", properties: { id: { type: "string" }, quantity: { type: "number", minimum: 1 } } } },
        groupId: { type: "string" }
    },
    required: ["name", "subgroupNumber", "priceItems"],
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


export class PriceItemsWithQuantity {
    @ApiProperty()
    _id: string

    @ApiProperty()
    quantity: number
}
export class CreateServiceSubgroupDto {
    @ApiProperty()
    subgroupNumber: string;


    @ApiProperty()
    name: string;

    @ApiProperty({ type: PriceItemsWithQuantity, isArray: true })
    priceItems: PriceItemsWithQuantity[];

    @ApiProperty({ required: false })
    groupId?: string;
}

export class UpdateServiceSubgroupDto {
    @ApiProperty()
    _id: string

    @ApiProperty({required: false})
    subgroupNumber?: string;

    @ApiProperty({required: false})
    name?: string;

    @ApiProperty({ type: PriceItemsWithQuantity, isArray: true, required: false })
    priceItems?: PriceItemsWithQuantity[];

    @ApiProperty({ required: false })
    groupId?: string;
}

export const updateSubgroupSchema = {
    ...createSubgroupSchema,
    allRequired: false,
    required: ["_id"],
    properties: {
        ...createSubgroupSchema.properties,
        _id: { type: "string" }
    }
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

export const updatePriceItemSchema = {
    ...createPriceItemSchema,
    allRequired: false,
    required: ["_id"],
    properties: {
        ...createPriceItemSchema.properties,
        _id: { type: "string" }
    }
}

export class UpdateGroupDto {
    @ApiProperty()
    _id: string

    @ApiProperty({ required: false })
    groupNumber?: string;

    @ApiProperty({ required: false })
    name?: string;

    @ApiProperty({ required: false })
    subgroupsIds?: string[];
}

export const updateGroupSchema = {
    ...createGroupSchema,
    allRequired: false,
    required: ["_id"],
    properties: {
        ...createGroupSchema.properties,
        _id: { type: "string" }
    }
}
