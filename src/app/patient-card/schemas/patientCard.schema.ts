import { commonDiseasesSchema, ICommonDiseasesSchema } from "./common-diseases.schema";
import { Schema } from "mongoose";
import { externalExaminationSchema, IExternalExaminationSchema } from "./externalExamination";

export interface IPatientCardSchema {
    _id?: string,
    patientId: string,
    commonDiseases: ICommonDiseasesSchema
    externalExamination: IExternalExaminationSchema
}

export const patientCardSchema = new Schema<IPatientCardSchema>({
    patientId: { type: String, nullable: false },
    commonDiseases: { type: commonDiseasesSchema, nullable: false },
    externalExamination: { type: externalExaminationSchema, nullable: false }
});

export const PATIENTS_CARDS_COLLECTION = 'patients_cards'
