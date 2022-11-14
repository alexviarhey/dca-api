import { CrudUseCases } from "../../core/crud.use-cases";
import { Injectable } from "@nestjs/common";
import { IPriceItemSchema, PRICE_ITEMS } from "../schemas/price-item.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model} from "mongoose";
import { IServiceSubgroup, SERVICE_SUBGROUPS } from "../schemas/service-subgroup.schema";
import { IServiceGroup, SERVICE_GROUPS } from "../schemas/service-group.schema";

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

class PriceItemMapper extends Mapper<IPriceItemSchema, PriceItemDto> {
    map(model: IPriceItemSchema): PriceItemDto {
        return {
            _id: "testId",
            itemNumber: 1,
            name: "Test",
            materialsCost: 1,
            serviceCost: 1
        };
    }
}

class ServiceSubgroupMapper extends Mapper<IServiceSubgroup, ServiceSubgroupDto> {
    map(model: IServiceSubgroup): ServiceSubgroupDto{
        return {
            _id: "testId",
            name: "Test",
            subgroupNumber: 1,
            priceItemsIds: ["1", "2"]
        };
    }
}

class ServiceGroupMapper extends Mapper<IServiceGroup, ServiceGroupDto> {
    map(model: IServiceGroup): ServiceGroupDto{
        return {
            _id: "testId",
            name: "Test",
            groupNumber: 1,
            subgroupIds: ["1", "2"]
        };
    }
}


@Injectable()
export class PriceItemsCrudUseCase extends CrudUseCases<IPriceItemSchema, CreatePriceItemDto, PriceItemDto> {
    constructor(
        @InjectModel(PRICE_ITEMS)
            priceItemModel: Model<IPriceItemSchema>
    ) {
        super(
            priceItemModel,
            new PriceItemMapper(),
            "Элемент прайс листа"
        );
    }
}

@Injectable()
export class ServiceSubgroupCrudUseCase extends CrudUseCases<IServiceSubgroup, CreateServiceSubgroupDto, ServiceSubgroupDto> {
    constructor(
        @InjectModel(SERVICE_SUBGROUPS)
            serviceSubgroupModel: Model<IServiceSubgroup>
    ) {
        super(
            serviceSubgroupModel,
            new ServiceSubgroupMapper(),
            "Подгруппа"
        );
    }
}

@Injectable()
export class ServiceGroupCrudUseCase extends CrudUseCases<IServiceGroup, CreateServiceGroupDto, ServiceGroupDto> {
    constructor(
        @InjectModel(SERVICE_GROUPS)
            serviceGroupModel: Model<IServiceGroup>
    ) {
        super(
            serviceGroupModel,
            new ServiceGroupMapper(),
            "Группа"
        );
    }
}

