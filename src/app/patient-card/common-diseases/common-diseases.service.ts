import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { UpdateCommonDiseasesDto } from "./dto";
import { CommonDiseasesMapper } from "./common-disesases.mapper";
import { Result } from "../../../core/result";


@Injectable()
export class CommonDiseasesService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private mapper: CommonDiseasesMapper
    ) {
    }

    async updateCommonDiseases(cardId: string, dto: UpdateCommonDiseasesDto): Promise<Result> {
        try {

            const updateRes = await this.cardModel.updateOne(
                { _id: cardId },
                { $set: { commonDiseases: this.mapper.mapToSchema(dto) } }
            )

            return updateRes.modifiedCount
                ? Result.ok()
                : Result.err('Карточка не найдена!')

        } catch (e) {
            console.log("CommonDiseasesService:updateCommonDiseases ", e)
            return Result.somethingWentWrong()
        }
    }
}