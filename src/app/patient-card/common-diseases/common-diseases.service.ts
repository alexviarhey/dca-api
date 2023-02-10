import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { CommonDiseasesDto, UpdateCommonDiseasesDto } from "./dto";
import { CommonDiseasesMapper } from "./common-disesases.mapper";
import { Result } from "../../../core/result";
import { ICommonDiseasesSchema } from "../schemas/common-diseases.schema";


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

    public getDeafultCommonDiseases(): ICommonDiseasesSchema {
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
