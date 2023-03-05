import { Schema } from "mongoose";

export type PreventiveActions = {
    motivationByRiskFactorsAndHygieneEducation: boolean;
    professionalHygiene: boolean;
    other: string | null;
}

export type TherapeuticTreatment = {
    replacementOfFillings: string | null;
    treatmentOfCariesAndNonCariousLesions: string | null;
    endodonticTreatment: string | null;
    treatmentOfDiseasesOfTheOralMucosa: string | null;
    other: string | null;
}

export type SurgicalTreatment = {
    extractionOfTeethToots: string | null;
    outpatientSurgicalInterventionsOnSoftTissues: string | null;
    outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: string | null;
    other: string | null;
}

export type GeneralTreatmentPlanSchema = {
    emergencyCare: string | null;
    preventiveActions: PreventiveActions;
    therapeuticTreatment: TherapeuticTreatment | null;
    surgicalTreatment: SurgicalTreatment | null;
    orthopedicTreatment: string | null;
    orthodonticTreatment: string | null;
    additionalDiagnosticMeasures: string | null;
    consultationOfOtherSpecialists: string | null;
}

const preventiveActionsSchema = new Schema<PreventiveActions>({
    motivationByRiskFactorsAndHygieneEducation: { type: Boolean, nullable: false },
    professionalHygiene: { type: Boolean, nullable: false },
    other: { type: String, nullable: true, default: null },
}, {_id: false})

const therapeuticTreatmentSchema = new Schema<TherapeuticTreatment>({
    replacementOfFillings: { type: String, nullable: true, default: null },
    treatmentOfCariesAndNonCariousLesions: { type: String, nullable: true, default: null },
    endodonticTreatment: { type: String, nullable: true, default: null },
    treatmentOfDiseasesOfTheOralMucosa: { type: String, nullable: true, default: null },
    other: { type: String, nullable: true, default: null },
}, { _id: false })

const surgicalTreatmentSchema = new Schema<SurgicalTreatment>({
    extractionOfTeethToots: { type: String, nullable: true, default: null },
    outpatientSurgicalInterventionsOnSoftTissues: { type: String, nullable: true, default: null },
    outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: { type: String, nullable: true, default: null },
    other: { type: String, nullable: true, default: null },
}, { _id: false })

export const generalTreatmentSchema = new Schema<GeneralTreatmentPlanSchema>({
    emergencyCare: { type: String, nullable: true, default: null },
    preventiveActions: { type: preventiveActionsSchema, nullable: true, default: null },
    therapeuticTreatment: { type: therapeuticTreatmentSchema, nullable: true, default: null },
    surgicalTreatment: { type: surgicalTreatmentSchema, nullable: true, default: null },
    orthopedicTreatment: { type: String, nullable: true, default: null },
    orthodonticTreatment: { type: String, nullable: true, default: null },
    additionalDiagnosticMeasures: { type: String, nullable: true, default: null },
    consultationOfOtherSpecialists: { type: String, nullable: true, default: null },
}, { _id: false })
