import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PRICE_ITEMS, priceItemSchema } from "./schemas/price-item.schema";
import { SERVICE_SUBGROUPS, serviceSubgroupSchema } from "./schemas/service-subgroup.schema";
import { SERVICE_GROUPS, serviceGroupSchema } from "./schemas/service-group.schema";
import {
    PriceItemsCrudUseCase,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase
} from "./use-cases/price-list.crud-use-cases";
import { GetPriceListUseCase } from "./use-cases/get-price-list.use-case";
import { PriceListCrudController } from "./controllers/price-list.crud-controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: priceItemSchema, name: PRICE_ITEMS },
            { schema: serviceSubgroupSchema, name: SERVICE_SUBGROUPS },
            { schema: serviceGroupSchema, name: SERVICE_GROUPS }
        ])
    ],
    providers: [
        PriceItemsCrudUseCase,
        ServiceSubgroupCrudUseCase,
        ServiceGroupCrudUseCase,
        GetPriceListUseCase
    ],
    controllers: [
        PriceListCrudController
    ],
    exports: [
        ServiceSubgroupCrudUseCase
    ]
})
export class PriceListModule {
}