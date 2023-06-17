import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { PromiseResult, Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { VisitDto } from "../dto/visit.dto";
import { VisitMapper } from "../mappers/visit.mapper";

@Injectable()
export class GetVisitUseCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private visitMapper: VisitMapper

    ) {
        super("GetVisitUseCase")
    }

    async execute(cardId: string, visitId: string): PromiseResult<VisitDto> {
        try {
            const card = await this.cardModel.findOne(
                {
                    _id: cardId
                },
                {
                    visits: { $elemMatch: {_id: visitId} }
                }
            )

            if (card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            if(!card.visits.length) {
                return Result.err(`Visit with id ${visitId} not found!`)
            }

            return Result.ok(
                await this.visitMapper.map(
                    card.visits[0]
                )
            )

        } catch (error) {
            this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'execute',
                error
            })
        }
    }
}
