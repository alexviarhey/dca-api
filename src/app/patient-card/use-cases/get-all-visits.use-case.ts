import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { PromiseResult, Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { ShortVisitDto} from "../dto/visit.dto";
import { VisitMapper } from "../mappers/visit.mapper";

@Injectable()
export class GetAllVisitsUseCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private visitMapper: VisitMapper

    ) {
        super("GetAllVisitsUseCase")
    }

    async execute(cardId: string): PromiseResult<ShortVisitDto[]> {
        try {
            const card = await this.cardModel.findOne({ _id: cardId }, { visits: 1 })
            if (!card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            return Result.ok(
                card.visits.map(this.visitMapper.shortMap)
            )

        } catch (error) {
            this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'execute',
                error
            })
        }
    }
}
