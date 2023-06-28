import { InjectModel } from "@nestjs/mongoose";
import { IPatientSchema, PATIENTS } from "../schemas/patient.schema";
import {  Model} from "mongoose";
import { Result } from "../../../core/result";
import { Injectable } from "@nestjs/common";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../patient-card/schemas/patientCard.schema";
import { BaseService } from "../../../core/base.service";
import { CardShortDto } from "../../patient-card/dto/card-short.dto";

@Injectable()
export class GetPatientCardsUserCase extends BaseService {
    constructor(
        @InjectModel(PATIENTS)
        private readonly patientModel: Model<IPatientSchema>,

        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,
    ) {
        super('');
    }

    public async execute(patientId: string): Promise<Result<CardShortDto[]>> {
        try {

            const patient = await this.patientModel.findById(patientId, {
                _id: 1
            })

            if (!patient) {
                return Result.err(`Пациент не найден!`)
            }

            const cards = await this.cardModel
                .find(
                    {
                        patientId
                    },
                    {
                        _id: 1,
                        createdAt: 1,
                        visits: { _id: 1 }
                    },
                )
                .sort({ createdAt: -1 })

            return Result.ok(cards.map(c => ({
                _id: c._id,
                createdAt: c.createdAt,
                visitsCount: c.visits.length
            })))

        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult({ error: e, method: 'execute' })
        }
    }
}
