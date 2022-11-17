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
    priceItems: PriceItemDto[]
}

export type CreateServiceGroupDto = {
    groupNumber: number
    name: string,
    subgroupIds: string[]
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