import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { patientCardSchema, PATIENTS_CARDS_COLLECTION } from "./schemas/patientCard.schema";
import { CommonDiseasesMapper } from "./mappers/common-diseases.mapper";
import { ExternalExaminationMapper } from "./mappers/external-examination.mapper";
import { GeneralTreatmentPlanMapper } from "./mappers/general-treatment-plan.mapper";
import { CreateCardUseCase } from "./use-cases/create-card.use-case";
import { PatientCardController } from "./controllers/patient-card.controller";
import { DentalStatusMapper } from "./mappers/dental-status.mapper";
import { CommonDiseasesService } from "./services/common-diseases.service";
import { ExternalExaminationService } from "./services/external-examination.service";
import { GeneralTreatmentPlanService } from "./services/general-treatment-plan.service";
import { DentalStatusTabService } from "./services/dental-status.service";
import { CreateVisitUseCase } from "./use-cases/create-visit.use-case";
import { VisitMapper } from "./mappers/visit.mapper";
import { GetVisitUseCase } from "./use-cases/get-visit.use-case";
import { UpdateVisitUseCase } from "./use-cases/update-visit.use-case";
import { ICD_COLLECTION, icdSchema } from "../icd/icd.schema";
import { GetAllVisitsUseCase } from "./use-cases/get-all-visits.use-case";


@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: patientCardSchema, name: PATIENTS_CARDS_COLLECTION },
            { schema: icdSchema, name: ICD_COLLECTION }
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
        DentalStatusMapper,
        CreateVisitUseCase,
        GetVisitUseCase,
        GetAllVisitsUseCase,
        UpdateVisitUseCase,
        VisitMapper
    ],
    controllers: [
        PatientCardController
    ],
    exports: [CreateCardUseCase]
})
export class PatientCardModule { }
