import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { patientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { CommonDiseasesMapper } from "../mappers/common-diseases.mapper";
import { PatientsModule } from "../../patients/patients.module";
import { ExternalExaminationMapper } from "../mappers/external-examination.mapper";
import { GeneralTreatmentPlanMapper } from "../mappers/general-treatment-plan.mapper";
import { CreateCardUseCase } from "./create-card.use-case";
import { CommonDiseasesService, ExternalExaminationService, GeneralTreatmentPlanService } from "../services/card-tab.services";
import { PatientCardController } from "../controllers/patient-card.controller";


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
        PatientCardController
    ]
})
export class PatientCardModule {
}
