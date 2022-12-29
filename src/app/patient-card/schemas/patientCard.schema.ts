import { commonDiseasesSchema, ICommonDiseasesSchema } from "./common-diseases.schema";
import { Schema } from "mongoose";

export interface IPatientCardSchema {
    _id?: string,
    patientId: string,
    commonDiseases: ICommonDiseasesSchema
}

export const patientCardSchema = new Schema<IPatientCardSchema>({
    patientId: { type: String, nullable: false },
    commonDiseases: { type: commonDiseasesSchema, nullable: false }
});

export const PATIENTS_CARDS_COLLECTION = 'patients_cards'