import { IPriceItemSchema } from "../schemas/price-item.schema";
import {
    CreatePriceItemDto, CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    PriceItemDto,
    ServiceGroupDto,
    ServiceSubgroupDto
} from "../dto/price-list.dtos";
import { IServiceSubgroup } from "../schemas/service-subgroup.schema";
import { IServiceGroup } from "../schemas/service-group.schema";
import { Mapper } from "../../../../core/mapper";

 class PriceItemMapper extends Mapper<IPriceItemSchema, PriceItemDto, CreatePriceItemDto> {
    async map(model: IPriceItemSchema): Promise<PriceItemDto> {
        return {
            _id: model._id.toString(),
            itemNumber: model.itemNumber,
            name: model.name,
            materialsCost: model.materialsCost,
            serviceCost: model.serviceCost,
            totalCost: model.serviceCost + model.materialsCost
        };
    }

    async mapToSchema(dto: CreatePriceItemDto): Promise<IPriceItemSchema> {
        return {
            itemNumber: dto.itemNumber,
            name: dto.name,
            materialsCost: dto.materialsCost,
            serviceCost: dto.serviceCost
        }
    }
 }

class ServiceSubgroupMapper extends Mapper<IServiceSubgroup, ServiceSubgroupDto, CreateServiceSubgroupDto> {
    async map(model: IServiceSubgroup): Promise<ServiceSubgroupDto> {
        return {
            _id: model._id.toString(),
            name: model.name,
            subgroupNumber: model.subgroupNumber,
            priceItems: model.priceItems
        };
    }

    async mapToSchema(dto: CreateServiceSubgroupDto): Promise<IServiceSubgroup> {
       return {
           name: dto.name,
           subgroupNumber: dto.subgroupNumber,
           priceItems: dto.priceItems
       }
    }
}

class ServiceGroupMapper extends Mapper<IServiceGroup, ServiceGroupDto, CreateServiceGroupDto> {
    async map(model: IServiceGroup): Promise<ServiceGroupDto> {
        return {
            _id: model._id.toString(),
            name: model.name,
            groupNumber: model.groupNumber,
            subgroupsIds: model.subgroupsIds
        };
    }

    async mapToSchema(dto: CreateServiceGroupDto): Promise<IServiceGroup> {
       return {
           name: dto.name,
           groupNumber: dto.groupNumber,
           subgroupsIds: dto.subgroupsIds
       }
    }
}

export const priceItemMapper = new PriceItemMapper()
export const serviceSubgroupMapper = new ServiceSubgroupMapper()
export const serviceGroupMapper = new ServiceGroupMapper()
