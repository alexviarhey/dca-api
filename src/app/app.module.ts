import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { InfraModule } from "../infra/infra.module";
import { PriceListModule } from "./price-list/price-list.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    InfraModule,
    PriceListModule
  ],
})
export class AppModule {}
