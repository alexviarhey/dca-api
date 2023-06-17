import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { InfraModule } from "../infra/infra.module";
import { PriceListModule } from "./price-list/price-list.module";
import { PatientsModule } from "./patients/patients.module";
import { ICDModule } from "./icd/icd.module";
import { TemplatesModule } from "./templates/templates.module";
import { PatientCardModule } from "./patient-card/patient-card.module";
import { PractitionersModule } from "./practitioners/practitioners.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        InfraModule,
        PriceListModule,
        PatientCardModule,
        PatientsModule,
        ICDModule,
        TemplatesModule,
        PractitionersModule
    ],
})
export class AppModule {
}
