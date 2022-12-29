import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { patientCardSchema, PATIENTS_CARDS_COLLECTION } from "./schemas/patientCard.schema";
import { CommonDiseasesService } from "./common-diseases/common-diseases.service";
import { CommonDiseasesMapper } from "./common-diseases/common-disesases.mapper";
import { CommonDiseasesController } from "./common-diseases/common-diseases.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: patientCardSchema, name: PATIENTS_CARDS_COLLECTION}
        ]),
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