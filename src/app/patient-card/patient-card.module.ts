import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { patientCardSchema, PATIENTS_CARDS_COLLECTION } from "./schemas/patientCard.schema";
import { CommonDiseasesService } from "./common-diseases/common-diseases.service";
import { CommonDiseasesMapper } from "./common-diseases/common-diseases.mapper";
import { CommonDiseasesController } from "./common-diseases/common-diseases.controller";
import { PatientsModule } from "../patients/patients.module";
import { ExternalExaminationController } from "./external-examination/external-examination.controller";
import { ExternalExaminationService } from "./external-examination/external-examination.service";
import { ExternalExaminationMapper } from "./external-examination/external-examination.mapper";
import { GeneralTreatmentPlanController } from "./general-treatment-plan/general-treatment-plan.controller";
import { GeneralTreatmentPlanService } from "./general-treatment-plan/general-treatment-plan.service";
import { GeneralTreatmentPlanMapper } from "./general-treatment-plan/general-treatment-plan.mapper";
import { CreateCardUseCase } from "./use-cases/create-card.use-case";


@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: patientCardSchema, name: PATIENTS_CARDS_COLLECTION }
        ]),
        PatientsModule
    ],
    providers: [
        CreateCardUseCase,
        CommonDiseasesService,
        CommonDiseasesMapper,
        ExternalExaminationService,
        ExternalExaminationMapper,
        GeneralTreatmentPlanService,
        GeneralTreatmentPlanMapper
    ],
    controllers: [
        CommonDiseasesController,
        ExternalExaminationController,
        GeneralTreatmentPlanController
    ]
})
export class PatientCardModule {
}
