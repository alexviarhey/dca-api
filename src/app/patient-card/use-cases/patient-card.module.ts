import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { patientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { CommonDiseasesMapper } from "../mappers/common-diseases.mapper";
import { ExternalExaminationMapper } from "../mappers/external-examination.mapper";
import { GeneralTreatmentPlanMapper } from "../mappers/general-treatment-plan.mapper";
import { CreateCardUseCase } from "./create-card.use-case";
import { CommonDiseasesService, DentalStatusTabService, ExternalExaminationService, GeneralTreatmentPlanService } from "../services/card-tab.services";
import { PatientCardController } from "../controllers/patient-card.controller";
import { DentalStatusMapper } from "../mappers/dental-status.mapper";


@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: patientCardSchema, name: PATIENTS_CARDS_COLLECTION }
        ]),
    ],
    providers: [
        CreateCardUseCase,
        CommonDiseasesService,
        CommonDiseasesMapper,
        ExternalExaminationService,
        ExternalExaminationMapper,
        GeneralTreatmentPlanService,
        GeneralTreatmentPlanMapper,
        DentalStatusTabService,
        DentalStatusMapper
    ],
    controllers: [
        PatientCardController
    ],
    exports: [CreateCardUseCase]
})
export class PatientCardModule {
}
