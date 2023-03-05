import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { CommonDiseasesService, ExternalExaminationService, GeneralTreatmentPlanService } from "../services/card-tab.services";


@Injectable()
export class CreateCardUseCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private commonDiseasesService: CommonDiseasesService,
        private externalExaminationService: ExternalExaminationService,
        private generalTreatmentPlanService: GeneralTreatmentPlanService
    ) {
        super("CreateCardUseCase")
    }

    async execute(patientId: string) {
        try {
            await this.cardModel.create({
                patientId,
                commonDiseases: this.commonDiseasesService.getDefaultCommonDiseases(),
                externalExamination: this.externalExaminationService.getDefaultExternalExamination(),
                generalTreatmentPlan: this.generalTreatmentPlanService.getDefaultGeneralTreatmentPlan()
            })

            return Result.ok()

        } catch (error) {
            this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'execute',
                error
            })
        }
    }
}
