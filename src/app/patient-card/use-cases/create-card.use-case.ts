import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { Model } from "mongoose";
import { Result } from "../../../core/result";
import { ICommonDiseasesSchema } from "../schemas/common-diseases.schema";


@Injectable()
export class CreateCardUseCase {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
    ) {
    }

    async execute() {
       try {
           await this.cardModel.create({
               commonDiseases: this.getDefaultCommonDiseases()
           })

           return Result.ok()

       } catch (e) {
           console.log('CreateCardUseCase error', e)
           return Result.somethingWentWrong()
       }
    }

    private getDefaultCommonDiseases(): ICommonDiseasesSchema {
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