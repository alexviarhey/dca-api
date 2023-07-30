import { Injectable } from "@nestjs/common"
import { CommonDiseasesMapper } from "../mappers/common-diseases.mapper"
import { CommonDiseasesDto } from "../dto/common-diseases.dto"
import { CardTabService } from "./card-tab.services"
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

@Injectable()
export class CommonDiseasesService extends CardTabService<CommonDiseasesDto, CommonDiseasesMapper> {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        cardModel: Model<IPatientCardSchema>,
        mapper: CommonDiseasesMapper,
    ) {
        super(
            cardModel,
            mapper,
            "commonDiseases"
        )
    }

    public getDefaultCommonDiseases(): CommonDiseasesDto {
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
            infectiousDiseases: null,
            other: null
        }
    }
}
