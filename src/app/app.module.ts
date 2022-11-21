import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InfraModule } from "../infra/infra.module";
import { PriceListModule } from "./price-list/price-list.module";
import { PatientsModule } from "./patients/patients.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        InfraModule,
        PriceListModule,
        PatientsModule
    ],
})
export class AppModule {
}
