import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { CommonDiseasesService } from "../services/common-diseases.service";
import { ExternalExaminationService } from "../services/external-examination.service";
import { GeneralTreatmentPlanService } from "../services/general-treatment-plan.service";
import { DentalStatusTabService } from "../services/dental-status.service";


@Injectable()
export class CreateCardUseCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private commonDiseasesService: CommonDiseasesService,
        private externalExaminationService: ExternalExaminationService,
        private generalTreatmentPlanService: GeneralTreatmentPlanService,
        private dentalStatusTabService: DentalStatusTabService
    ) {
        super("CreateCardUseCase")
    }

    async execute(patientId: string) {
        try {
            await this.cardModel.create({
                patientId,
                commonDiseases: this.commonDiseasesService.getDefaultCommonDiseases(),
                externalExamination: this.externalExaminationService.getDefaultExternalExamination(),
                generalTreatmentPlan: this.generalTreatmentPlanService.getDefaultGeneralTreatmentPlan(),
                dentalStatus: this.dentalStatusTabService.getDefaultDentalStatus()
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
