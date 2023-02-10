import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Result } from "src/core/result";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../schemas/patientCard.schema";
import { ExternalExaminationDto } from "./dto";


@Injectable()
export class ExteranlExaminationService {


    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private cardModel: Model<IPatientCardSchema>,
    ) {}

    public async getExternalExamination(): Promise<Result<ExternalExaminationDto>> {
        try {
        } catch(e) {
        }
    }

    public async updateExternalExamination(): Promise<Result<ExternalExaminationDto>> {
        try {
        } catch(e) {
        }
    }

    public async getDefaultExternalExamination(): Promise<Result<ExternalExaminationDto>> {
        try {
        } catch(e) {
        }
    }

}
