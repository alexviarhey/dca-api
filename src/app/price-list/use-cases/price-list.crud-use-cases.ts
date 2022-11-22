import { CrudUseCases } from "../../../core/crud.use-cases";
import { Injectable } from "@nestjs/common";
import { IPriceItemSchema, PRICE_ITEMS } from "../schemas/price-item.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IServiceSubgroup, SERVICE_SUBGROUPS } from "../schemas/service-subgroup.schema";
import { IServiceGroup, SERVICE_GROUPS } from "../schemas/service-group.schema";
import {
    CreatePriceItemDto, CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    PriceItemDto,
    ServiceGroupDto,
    ServiceSubgroupDto
} from "../dto/price-list.dtos";
import {
    priceItemMapper,
    serviceGroupMapper,
    serviceSubgroupMapper
} from "../mappers/price-list.mappers";


@Injectable()
export class PriceItemsCrudUseCase extends CrudUseCases<IPriceItemSchema, CreatePriceItemDto, PriceItemDto> {
    constructor(
        @InjectModel(PRICE_ITEMS)
            priceItemModel: Model<IPriceItemSchema>
    ) {
        super(
            priceItemModel,
            priceItemMapper,
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
            serviceSubgroupMapper,
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
            serviceGroupMapper,
            "Группа"
        );
    }
}

