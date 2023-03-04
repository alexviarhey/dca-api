import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { UpdateCommonDiseasesDto } from "./dto";
import { CommonDiseasesMapper } from "./common-diseases.mapper";
import { Result } from "../../../core/result";
import { ICommonDiseasesSchema } from "../schemas/common-diseases.schema";
import { BaseService } from "../../../core/base.service";

@Injectable()
export class CommonDiseasesService extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private mapper: CommonDiseasesMapper
    ) {
        super("CommonDiseasesService")
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

        } catch (error) {
            this.errorLogger.logErrorAndReturnSomethingWentWrongResult({
                method: 'updateCommonDiseases',
                error
            })
        }
    }

    public getDefaultCommonDiseases(): ICommonDiseasesSchema {
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
