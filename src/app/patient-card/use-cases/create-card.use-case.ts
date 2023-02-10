import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { Result } from "../../../core/result";
import { CommonDiseasesService } from "../common-diseases/common-diseases.service";


@Injectable()
export class CreateCardUseCase {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private commonDiseasesService: CommonDiseasesService
    ) {
    }

    async execute(patientId: string) {
        try {
            await this.cardModel.create({
                patientId,
                commonDiseases: this.commonDiseasesService.getDeafultCommonDiseases()
            })

            return Result.ok()

        } catch (e) {
            console.log('CreateCardUseCase error', e)
            return Result.somethingWentWrong()
        }
    }
}
