import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Result } from "src/core/result";
import { BaseService } from "../../../core/base.service";
import { FaceConfiguration, LymphNodes, TemporomandibularJoint } from "../schemas/externalExamination";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { ExternalExaminationDto } from "./dto";
import { ExternalExaminationMapper } from "./external-examination.mapper";


@Injectable()
export class ExternalExaminationService extends BaseService {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private mapper: ExternalExaminationMapper
    ) {
        super("ExternalExaminationService")
    }

    public async getExternalExamination(cardId: string): Promise<Result<ExternalExaminationDto>> {
        try {
            const card = await this.cardModel.findById(
                cardId,
                { externalExamination: 1 }
            )

            if (!card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            return Result.ok(
                await this.mapper.map(card.externalExamination)
            )
        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'getExternalExamination',
                error
            })
        }
    }

    public async updateExternalExamination(cardId: string, data: ExternalExaminationDto): Promise<Result> {
        try {
            const updateRes = await this.cardModel.updateOne(
                {
                    _id: cardId
                },
                {
                    $set: {
                        externalExamination: this.mapper.mapToSchema(data)
                    }
                }
            )

            return updateRes.modifiedCount
                ? Result.ok()
                : Result.err('Карточка не найдена!')

        } catch (error) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'updateExternalExamination',
                error
            })
        }
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
