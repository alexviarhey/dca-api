import { Injectable } from "@nestjs/common";
import { logErrorsAndReturnSomethingWentWrongResult } from "../../core/errors";
import {
    PriceItemsCrudUseCase,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase
} from "./price-list.crud-use-cases";
import { PriceListDto } from "../dto/price-list.dtos";
import { Result } from "../../core/result";

@Injectable()
export class GetPriceListUseCase {

    async execute(
        priceItemsCrudUseCase: PriceItemsCrudUseCase,
        serviceSubgroupUseCase: ServiceSubgroupCrudUseCase,
        serviceGroupUseCase: ServiceGroupCrudUseCase
    ): Promise<Result<PriceListDto>> {
        try {
            //TODO get subgroups and groups by ids, because we can have draft groups
            const groupsRes = await serviceGroupUseCase.find();
            if (!groupsRes.isSuccess) return groupsRes.mapErr()

            const subgroupsRes = await serviceSubgroupUseCase.find();
            if (!subgroupsRes.isSuccess) subgroupsRes.mapErr()

            const priceItemsRes = await priceItemsCrudUseCase.find();
            if (!priceItemsRes.isSuccess) priceItemsRes.mapErr()

            const subgroupsMap = GetPriceListUseCase.createMap(subgroupsRes.data);
            const priceItemsMap = GetPriceListUseCase.createMap(priceItemsRes.data);

            const priceList: PriceListDto = groupsRes.data.map(g => {
                const subgroups = g.subgroupIds.map(id => subgroupsMap.get(id));

                const subgroupsWithPriceItems = subgroups.map(sg => {
                    const priceItems = sg.priceItemsIds.map(id => priceItemsMap.get(id));
                    return {
                        _id: sg._id,
                        subgroupNumber: sg.subgroupNumber,
                        name: sg.name,
                        priceItems
                    };
                });

                return {
                    _id: g._id,
                    groupNumber: g.groupNumber,
                    name: g.name,
                    subgroups: subgroupsWithPriceItems
                };
            });

            return Result.ok(priceList)
        } catch (e) {
            return logErrorsAndReturnSomethingWentWrongResult(
                "GetPriceListUseCase",
                "execute",
                e
            );
        }
    }

    private static createMap<T extends { _id: string }>(items: T[]): Map<string, T> {
        return items.reduce((map, item) => {
            map.set(item._id, item);
            return map;
        }, new Map());
    };
}