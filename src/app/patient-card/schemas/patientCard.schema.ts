import { commonDiseasesSchema, ICommonDiseasesSchema } from "./common-diseases.schema";
import { Schema } from "mongoose";
import { externalExaminationSchema, IExternalExaminationSchema } from "./externalExamination";
import { GeneralTreatmentPlanSchema, generalTreatmentSchema } from "./general-treatment-plan.schema";
import { DentalStatusSchema, dentalStatusSchema } from "./dental-status.schema";
import { visitSchema, VisitSchema } from "./visit.schema";

export interface IPatientCardSchema {
    _id?: string,
    patientId: string,
    commonDiseases: ICommonDiseasesSchema
    externalExamination: IExternalExaminationSchema,
    generalTreatmentPlan: GeneralTreatmentPlanSchema,
    dentalStatus: DentalStatusSchema
    visits: VisitSchema[]
}

export const patientCardSchema = new Schema<IPatientCardSchema>({
    patientId: { type: String, nullable: false },
    commonDiseases: { type: commonDiseasesSchema, nullable: false },
    externalExamination: { type: externalExaminationSchema, nullable: false },
    generalTreatmentPlan: { type: generalTreatmentSchema, nullable: false },
    dentalStatus: { type: dentalStatusSchema },
    visits: { type: [visitSchema], default: [] },
});

export const PATIENTS_CARDS_COLLECTION = 'patients_cards'
