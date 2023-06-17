import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { PromiseResult, Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { CreateVisitDto } from "../dto/visit.dto";
import { VisitMapper } from "../mappers/visit.mapper";

@Injectable()
export class UpdateVisitUseCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private visitMapper: VisitMapper

    ) {
        super("CreateVisitUseCase")
    }

    async execute(cardId: string, visitId: string, dto: CreateVisitDto): PromiseResult {
        try {
            const card = await this.cardModel.findOne({ _id: cardId }, { _id: true })
            if (card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            const visitSchema = await this.visitMapper.mapToSchema(dto)

            const setObject =
                Object
                    .keys(visitSchema)
                    .reduce((acc, k) => {
                        acc[`visits.$.${k}`] = visitSchema[k]
                        return acc
                    }, {})

            await this.cardModel.updateOne(
                { _id: cardId, "visits._id": visitId },
                { $set: setObject }
            )

            return Result.ok()

        } catch (error) {
            this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'execute',
                error
            })
        }
    }
}
