import { Injectable } from "@nestjs/common"
import { CardTabService } from "./card-tab.services"
import { ExternalExaminationDto } from "../dto/external-examination.dto"
import { ExternalExaminationMapper } from "../mappers/external-examination.mapper"
import { InjectModel } from "@nestjs/mongoose"
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema"
import { Model } from "mongoose"
import { FaceConfiguration, LymphNodes, TemporomandibularJoint } from "../schemas/externalExamination"

@Injectable()
export class ExternalExaminationService extends CardTabService<ExternalExaminationDto, ExternalExaminationMapper> {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        cardModel: Model<IPatientCardSchema>,
        mapper: ExternalExaminationMapper,
    ) {
        super(
            cardModel,
            mapper,
            "externalExamination"
        )
    }

    public getDefaultExternalExamination(): ExternalExaminationDto {
        return {
            complaints: null,
            stateOfHealth: 'удовлетворительное',
            conditionOfTheSkinRedBorder: null,
            faceConfiguration: [
                FaceConfiguration.NOT_CHANGED,
                FaceConfiguration.NASOLABIAL_CHIN_FOLDS_NOT_EXPRESSED
            ],
            lymphNodes: [
                LymphNodes.NOT_ENLARGED,
                LymphNodes.ELASTIC,
                LymphNodes.MOBILE,
                LymphNodes.PAINLESS
            ],
            temporomandibularJoint: [
                TemporomandibularJoint.PAINLESS,
                TemporomandibularJoint.MOVEMENT_IN_FULL
            ]
        }
    }
}
