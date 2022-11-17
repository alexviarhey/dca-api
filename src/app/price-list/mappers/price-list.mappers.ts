import { IPriceItemSchema } from "../schemas/price-item.schema";
import { PriceItemDto, ServiceGroupDto, ServiceSubgroupDto } from "../dto/price-list.dtos";
import { IServiceSubgroup } from "../schemas/service-subgroup.schema";
import { IServiceGroup } from "../schemas/service-group.schema";
import { Mapper } from "../../core/mapper";

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

export const priceItemMapper = new PriceItemMapper()
export const serviceSubgroupMapper = new ServiceSubgroupMapper()
export const serviceGroupMapper = new ServiceGroupMapper()
