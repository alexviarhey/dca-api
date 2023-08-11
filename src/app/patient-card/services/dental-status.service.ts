import { Injectable } from "@nestjs/common"
import { CardTabService } from "./card-tab.services"
import { DentalStatusDto } from "../dto/dental-status.dto"
import { DentalStatusMapper } from "../mappers/dental-status.mapper"
import { InjectModel } from "@nestjs/mongoose"
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema"
import { Model } from "mongoose"
import { DentalFormula, DentalIndexes, DentalStatusSchema } from "../schemas/dental-status.schema"

@Injectable()
export class DentalStatusTabService extends CardTabService<DentalStatusDto, DentalStatusMapper> {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        cardModel: Model<IPatientCardSchema>,
        mapper: DentalStatusMapper,
    ) {
        super(
            cardModel,
            mapper,
            "dentalStatus"
        )
    }

    public getDefaultDentalStatus(): DentalStatusSchema {
        return {
            dentalFormula: DentalFormula.default(),
            ohis: DentalIndexes.defaultOhis(),
            kpi: DentalIndexes.defaultKpi(),
            kpu: DentalIndexes.defaultKpu(),
            bite: null,
            hardTissueConditions: {
                colorChange: null,
                shapeChange: null,
                surfaceChange: null,
                largeFillings: null,
            },
            periodontalCondition: {
                bleeding: null,
                dentogingivalAttachmentDisorder: null,
                recession: null,
                presenceOfPeriodontalPocket: null,
                toothMobility: null,
            },
            conditionOfTheOralMucosa: {
                hyperemic: false,
                edematous: false,
                hyperplasia: false,
                colorIsBroken: false,
                other: null
            },
            researchData: null,
            provisionalDiagnosis: null
        }
    }
}
