import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { Result } from "../../../core/result";
import { ICommonDiseasesSchema } from "../schemas/common-diseases.schema";
import { CommonDiseasesService } from "../common-diseases/common-diseases.service";


@Injectable()
export class CreateCardUseCase {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
        private commonDiseasesService: CommonDiseasesService
    ) {
    }

    async execute() {
        try {
            await this.cardModel.create({
                commonDiseases: this.commonDiseasesService.getDeafultCommonDiseases()
            })

            return Result.ok()

        } catch (e) {
            console.log('CreateCardUseCase error', e)
            return Result.somethingWentWrong()
        }
    }
}
