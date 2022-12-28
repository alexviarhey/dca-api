import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InfraModule } from "../infra/infra.module";
import { PriceListModule } from "./price-list/price-list.module";
import { PatientsModule } from "./patients/patients.module";
import { ICDModule } from "./icd/icd.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        InfraModule,
        PriceListModule,
        PatientsModule,
        ICDModule
    ],
})
export class AppModule {
}
