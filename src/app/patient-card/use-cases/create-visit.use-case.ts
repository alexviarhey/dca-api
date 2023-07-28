import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { PromiseResult, Result } from "../../../core/result";
import { BaseService } from "../../../core/base.service";
import { CreateVisitDto } from "../dto/visit.dto";
import { VisitMapper } from "../mappers/visit.mapper";

@Injectable()
export class CreateVisitUseCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private visitMapper: VisitMapper

    ) {
        super("CreateVisitUseCase")
    }

    async execute(cardId: string, dto: CreateVisitDto): PromiseResult {
        try {
            const card = await this.cardModel.findOne({ _id: cardId }, { _id: true })
            if(!card) {
                return Result.err(`Card with id ${cardId} not found!`)
            }

            await this.cardModel.updateOne(
                { _id: cardId },
                { $push: {visits: await this.visitMapper.mapToSchema(dto)} }
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
