import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { BaseService } from "../../../core/base.service"
import { Mapper } from "../../../core/mapper"
import { Result } from "../../../core/result"
import { CommonDiseasesDto } from "../dto/common-diseases.dto"
import { ExternalExaminationDto } from "../dto/external-examination.dto"
import { GeneralTreatmentPlanDto } from "../dto/general-treatment-plan.dto"
import { CommonDiseasesMapper } from "../mappers/common-diseases.mapper"
import { ExternalExaminationMapper } from "../mappers/external-examination.mapper"
import { GeneralTreatmentPlanMapper } from "../mappers/general-treatment-plan.mapper"
import { FaceConfiguration, LymphNodes, TemporomandibularJoint } from "../schemas/externalExamination"
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema"

type TabSchema = (IPatientCardSchema)[keyof IPatientCardSchema]

class CardTabService<Dto, M extends Mapper<TabSchema, Dto>> extends BaseService {
    constructor(
        private cardModel: Model<IPatientCardSchema>,
        private mapper: M,
        private tabName: keyof IPatientCardSchema
    ) {
        super("CardTabService")
    }

    public async getTabData(cardId: string): Promise<Result<Dto>> {
        try {
            const card = await this.cardModel.findById(
                cardId,
                { [this.tabName]: 1 }
            )

            if (!card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            return Result.ok(
                await this.mapper.map(card[this.tabName])
            )
        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'getTabData',
                error
            })
        }
    }

    public async updateTabData(cardId: string, data: Dto): Promise<Result> {
        try {
            const updateRes = await this.cardModel.updateOne(
                {
                    _id: cardId
                },
                {
                    $set: {
                        [this.tabName]: this.mapper.mapToSchema(data)
                    }
                }
            )

            return updateRes.modifiedCount
                ? Result.ok()
                : Result.err('Карточка не найдена!')

        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'updateTabData',
                error
            })
        }
    }
}



@Injectable()
export class CommonDiseasesService extends CardTabService<CommonDiseasesDto, CommonDiseasesMapper> {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        cardModel: Model<IPatientCardSchema>,
        mapper: CommonDiseasesMapper,
    ) {
        super(
            cardModel,
            mapper,
            "commonDiseases"
        )
    }

    public getDefaultCommonDiseases(): CommonDiseasesDto {
        return {
            cardiovascularSystem: null,
            nervousSystem: null,
            endocrineSystem: null,
            digestiveSystem: null,
            respiratorySystem: null,
            allergicReactions: null,
            continuousUseOfMedicines: null,
            harmfulFactors: null,
            pregnancyOrPostpartumPeriod: null,
            infectiousDiseases: null
        }
    }
}

@Injectable()
export class ExternalExaminationService extends CardTabService<ExternalExaminationDto, ExternalExaminationMapper> {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        cardModel: Model<IPatientCardSchema>,
        mapper: ExternalExaminationMapper,
    ) {
        super(
            cardModel,
            mapper,
            "externalExamination"
        )
    }

    public async getDefaultExternalExamination(): Promise<Result<ExternalExaminationDto>> {
        return Result.ok({
            complaints: null,
            conditionOfTheSkinRedBorder: null,
            faceConfiguration: [
                FaceConfiguration.NOT_CHANGED,
                FaceConfiguration.NASOLABIAL_CHIN_FOLDS_NOT_EXPRESSED
            ],
            lymphNodes: [
                LymphNodes.NOT_ENLARGED,
                LymphNodes.ELASTIC,
                LymphNodes.MOBILE,
                LymphNodes.PAINLESS
            ],
            temporomandibularJoint: [
                TemporomandibularJoint.PAINLESS,
                TemporomandibularJoint.MOVEMENT_IN_FULL
            ]
        })
    }
}

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
