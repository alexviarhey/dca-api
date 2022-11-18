const costRules = { type: "number", minimum: 0.1 };
const numberRules = { type: "string", pattern: "^\\d*\\d(.\\d*\\d)*$"};
const nameRules = { type: "string", transform: ["trim"], minLength: 3, maxLength: 40 };
const idsRules = { type: "array", items: { type: "string" } }

export const createPriceItemSchema = {
    type: "object",
    properties: {
        name: nameRules,
        itemNumber: numberRules,
        materialsCost: costRules,
        serviceCost: costRules
    },
    allRequired: true,
    additionalProperties: false,
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

export type CreatePriceItemDto = {
    itemNumber: number
    name: string
    materialsCost: number
    serviceCost: number
}

export type CreateServiceSubgroupDto = {
    subgroupNumber: number
    name: string,
    priceItemsIds: string[]
}

export type ServiceSubgroupDto = CreateServiceSubgroupDto & {
    _id: string
}

export type ServiceSubgroupWithPriceItemsDto = {
    _id: string
    subgroupNumber: number
    name: string,
    materialsCost: number,
    serviceCost: number,
    priceItems: PriceItemDto[],
}

export type CreateServiceGroupDto = {
    groupNumber: number
    name: string,
    subgroupsIds: string[]
}

export type ServiceGroupDto = CreateServiceGroupDto & {
    _id: string
}

export type ServiceGroupWithSubgroupsDto = {
    _id: string
    groupNumber: number
    name: string,
    subgroups: ServiceSubgroupWithPriceItemsDto[]
}


export type PriceItemDto = CreatePriceItemDto & {
    _id: string
}