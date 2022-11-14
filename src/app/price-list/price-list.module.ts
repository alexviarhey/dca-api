import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PRICE_ITEMS, priceItemSchema } from "./schemas/price-item.schema";
import { SERVICE_SUBGROUPS, serviceSubgroupSchema } from "./schemas/service-subgroup.schema";
import { SERVICE_GROUPS, serviceGroupSchema } from "./schemas/service-group.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: priceItemSchema, name: PRICE_ITEMS },
      { schema: serviceSubgroupSchema, name: SERVICE_SUBGROUPS},
      { schema: serviceGroupSchema, name: SERVICE_GROUPS},
    ])
  ]
})
export class PriceListModule {}