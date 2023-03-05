import { PreventiveActions, SurgicalTreatment, TherapeuticTreatment } from "../schemas/general-treatment-plan.schema"

export type GeneralTreatmentPlanDto = {
    emergencyCare: string | null
    preventiveActions: PreventiveActions | null,
    therapeuticTreatment: TherapeuticTreatment | null,
    surgicalTreatment: SurgicalTreatment | null,
    orthopedicTreatment: string | null
    orthodonticTreatment: string | null
    additionalDiagnosticMeasures: string | null
    consultationOfOtherSpecialists: string | null
}

export const generalTreatmentAjvSchema = {
    type: "object",
    additionalProperties: false,
    allRequired: true,
    properties: {
        emergencyCare: { type: 'string', nullable: true },
        orthopedicTreatment: { type: 'string', nullable: true },
        orthodonticTreatment: { type: 'string', nullable: true },
        additionalDiagnosticMeasures: { type: 'string', nullable: true },
        consultationOfOtherSpecialists: { type: 'string', nullable: true },
        preventiveActions: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: true,
            properties: {
                motivationByRiskFactorsAndHygieneEducation: { type: 'boolean', nullable: false },
                professionalHygiene: { type: 'boolean', nullable: false },
                other: { type: 'string', nullable: true },
            }
        },
        therapeuticTreatment: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: true,
            properties: {
                replacementOfFillings: { type: 'string', nullable: true },
                treatmentOfCariesAndNonCariousLesions: { type: 'string', nullable: true },
                endodonticTreatment: { type: 'string', nullable: true },
                treatmentOfDiseasesOfTheOralMucosa: { type: 'string', nullable: true },
                other: { type: 'string', nullable: true },
            }
        },
        surgicalTreatment: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: true,
            properties: {
                extractionOfTeethToots: { type: 'string', nullable: true },
                outpatientSurgicalInterventionsOnSoftTissues: { type: 'string', nullable: true },
                outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: { type: 'string', nullable: true },
                other: { type: 'string', nullable: true },
            }
        }
    }
}
