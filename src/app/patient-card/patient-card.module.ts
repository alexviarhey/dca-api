import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { patientCardSchema, PATIENTS_CARDS_COLLECTION } from "./schemas/patientCard.schema";
import { CommonDiseasesService } from "./common-diseases/common-diseases.service";
import { CommonDiseasesMapper } from "./common-diseases/common-disesases.mapper";
import { CommonDiseasesController } from "./common-diseases/common-diseases.controller";
import { PatientsModule } from "../patients/patients.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: patientCardSchema, name: PATIENTS_CARDS_COLLECTION}
        ]),
        PatientsModule
    ],
    providers: [
        CommonDiseasesService,
        CommonDiseasesMapper
    ],
    controllers: [
        CommonDiseasesController
    ]
})
export class PatientCardModule {
}
