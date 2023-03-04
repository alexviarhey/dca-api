import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { GeneralTreatmentPlanDto } from "./dto";
import { GeneralTreatmentPlanMapper } from "./general-treatment-plan.mapper";


@Injectable()
export class GeneralTreatmentPlanService extends BaseService {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private mapper: GeneralTreatmentPlanMapper
    ) {
        super("GeneralTreatmentPlanService")
    }


    public async getGeneralTreatmentPlan(cardId: string): Promise<Result<GeneralTreatmentPlanDto>> {
        try {
            const card = await this.cardModel.findById(
                cardId,
                { generalTreatmentPlan: 1 }
            )

            if (!card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            return Result.ok(
                await this.mapper.map(card.generalTreatmentPlan)
            )

        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'getGeneralTreatmentPlan',
                error
            })
        }
    }

    public async updateGeneralTreatmentPlan(cardId: string, data: GeneralTreatmentPlanDto): Promise<Result> {
        try {
            const updateRes = await this.cardModel.updateOne(
                {
                    _id: cardId
                },
                {
                    $set: {
                        generalTreatmentPlan: this.mapper.mapToSchema(data)
                    }
                }
            )

            return updateRes.modifiedCount
                ? Result.ok()
                : Result.err('Карточка не найдена!')

        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'updateGeneralTreatmentPlan',
                error
            })
        }
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
