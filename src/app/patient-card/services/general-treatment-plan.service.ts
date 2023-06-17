import { Injectable } from "@nestjs/common"
import { CardTabService } from "./card-tab.services"
import { GeneralTreatmentPlanDto } from "../dto/general-treatment-plan.dto"
import { GeneralTreatmentPlanMapper } from "../mappers/general-treatment-plan.mapper"
import { InjectModel } from "@nestjs/mongoose"
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema"
import { Model } from "mongoose"

@Injectable()
export class GeneralTreatmentPlanService extends CardTabService<GeneralTreatmentPlanDto, GeneralTreatmentPlanMapper> {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        cardModel: Model<IPatientCardSchema>,
        mapper: GeneralTreatmentPlanMapper,
    ) {
        super(
            cardModel,
            mapper,
            "generalTreatmentPlan"
        )
    }

    public getDefaultGeneralTreatmentPlan(): GeneralTreatmentPlanDto {
        return {
            emergencyCare: null,
            preventiveActions: {
                motivationByRiskFactorsAndHygieneEducation: true,
                professionalHygiene: true,
                other: null
            },
            therapeuticTreatment: null,
            surgicalTreatment: null,
            orthopedicTreatment: null,
            orthodonticTreatment: null,
            additionalDiagnosticMeasures: null,
            consultationOfOtherSpecialists: null
        }
    }
}
