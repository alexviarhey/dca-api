import { ICommonDiseasesSchema } from "./common-diseases.schema";

export interface IPatientCardSchema {
    _id?: string,
    commonDiseases: ICommonDiseasesSchema
}