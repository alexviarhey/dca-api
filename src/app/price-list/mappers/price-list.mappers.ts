import { IPriceItemSchema } from "../schemas/price-item.schema";
import { PriceItemDto, ServiceGroupDto, ServiceSubgroupDto } from "../dto/price-list.dtos";
import { IServiceSubgroup } from "../schemas/service-subgroup.schema";
import { IServiceGroup } from "../schemas/service-group.schema";
import { Mapper } from "../../core/mapper";

 class PriceItemMapper extends Mapper<IPriceItemSchema, PriceItemDto> {
    map(model: IPriceItemSchema): PriceItemDto {
        return {
            _id: model._id.toString(),
            itemNumber: model.itemNumber,
            name: model.name,
            materialsCost: model.materialsCost,
            serviceCost: model.serviceCost
        };
    }
}

class ServiceSubgroupMapper extends Mapper<IServiceSubgroup, ServiceSubgroupDto> {
    map(model: IServiceSubgroup): ServiceSubgroupDto{
        return {
            _id: model._id.toString(),
            name: model.name,
            subgroupNumber: model.subgroupNumber,
            priceItemsIds: model.priceItemsIds
        };
    }
}

class ServiceGroupMapper extends Mapper<IServiceGroup, ServiceGroupDto> {
    map(model: IServiceGroup): ServiceGroupDto{
        return {
            _id: model._id.toString(),
            name: model.name,
            groupNumber: model.groupNumber,
            subgroupsIds: model.subgroupsIds
        };
    }
}

export const priceItemMapper = new PriceItemMapper()
export const serviceSubgroupMapper = new ServiceSubgroupMapper()
export const serviceGroupMapper = new ServiceGroupMapper()
