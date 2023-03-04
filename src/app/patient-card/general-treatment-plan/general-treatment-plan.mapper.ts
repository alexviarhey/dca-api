import { Mapper } from "../../../core/mapper";
import { GeneralTreatmentPlanDto } from "./dto";
import { Injectable } from "@nestjs/common";
import { GeneralTreatmentPlanSchema } from "../schemas/general-treatment-plan.schema";

@Injectable()
export class GeneralTreatmentPlanMapper extends Mapper<GeneralTreatmentPlanSchema, GeneralTreatmentPlanDto, GeneralTreatmentPlanDto> {
    async map(model: GeneralTreatmentPlanSchema): Promise<GeneralTreatmentPlanDto> {
        return this.mapFromSource(model)
    }

    async mapToSchema(dto: Partial<GeneralTreatmentPlanDto>): Promise<GeneralTreatmentPlanSchema> {
        return this.mapFromSource(dto)
    }

    private mapFromSource(source) {
        return {
            emergencyCare: source.emergencyCare,
            preventiveActions: source.preventiveActions ? {
                motivationByRiskFactorsAndHygieneEducation: source.preventiveActions.motivationByRiskFactorsAndHygieneEducation,
                professionalHygiene: source.preventiveActions.professionalHygiene,
                other: source.preventiveActions.other
            } : null,
            therapeuticTreatment: source.therapeuticTreatment ? {
                replacementOfFillings: source.therapeuticTreatment.replacementOfFillings,
                treatmentOfCariesAndNonCariousLesions: source.therapeuticTreatment.treatmentOfCariesAndNonCariousLesions,
                endodonticTreatment: source.therapeuticTreatment.endodonticTreatment,
                treatmentOfDiseasesOfTheOralMucosa: source.therapeuticTreatment.treatmentOfDiseasesOfTheOralMucosa,
                other: source.therapeuticTreatment.other
            } : null,
            surgicalTreatment: source.surgicalTreatment ? {
                extractionOfTeethToots: source.surgicalTreatment.extractionOfTeethToots,
                outpatientSurgicalInterventionsOnSoftTissues: source.surgicalTreatment.outpatientSurgicalInterventionsOnSoftTissues,
                outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: source.surgicalTreatment.outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton,
                other: source.surgicalTreatment.other
            } : null,
            orthopedicTreatment: source.orthopedicTreatment,
            orthodonticTreatment: source.orthodonticTreatment,
            additionalDiagnosticMeasures: source.additionalDiagnosticMeasures,
            consultationOfOtherSpecialists: source.consultationOfOtherSpecialists
        }
    }
}
