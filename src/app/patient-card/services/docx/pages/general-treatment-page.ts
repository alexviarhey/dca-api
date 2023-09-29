import { Injectable } from "@nestjs/common";
import { DocxPage, GetPatchesParams } from "./docx-page";
import { IPatch } from "docx";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../../schemas/patientCard.schema";
import { Result } from "../../../../../core/result";

@Injectable()
export class GeneralTreatmentPage extends DocxPage {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,
    ) {
        super("generalTreatmentPlan.docx")
    }

    public async getPatchesForTemplate({ cardId }: GetPatchesParams): Promise<Result<{ [key: string]: IPatch; }>> {

        const card = await this.cardModel.findById(cardId, { generalTreatmentPlan: 1 })

        if (!card) {
            return Result.err('Карточка не найдена!')
        }

        const dataForPatches = this.getData(card)

        const patches = Object
            .keys(dataForPatches)
            .reduce((res, key) => {
                const value = dataForPatches[key]

                let text;

                if (typeof value === 'boolean') {
                    text = value ? 'ДА' : 'НЕТ'
                } else {
                    text = value ?? 'НЕТ'
                }

                res[key] = this.getParagraphPatch({ text, underline: true })

                return res
            }, {})

        return Result.ok(patches)
    }

    private getData(card: IPatientCardSchema) {
        return {
            emergencyCare: card.generalTreatmentPlan.emergencyCare,
            motivationByRiskFactorsAndHygieneEducation: card.generalTreatmentPlan.preventiveActions.motivationByRiskFactorsAndHygieneEducation,
            professionalHygiene: card.generalTreatmentPlan.preventiveActions.professionalHygiene,
            preventiveActionsOther: card.generalTreatmentPlan.preventiveActions.other,
            replacementOfFillings: card.generalTreatmentPlan.therapeuticTreatment?.replacementOfFillings,
            treatmentOfCariesAndNonCariousLesions: card.generalTreatmentPlan.therapeuticTreatment?.treatmentOfCariesAndNonCariousLesions,
            endodonticTreatment: card.generalTreatmentPlan.therapeuticTreatment?.endodonticTreatment,
            periodontalTreatment: card.generalTreatmentPlan.therapeuticTreatment?.periodontalTreatment,
            treatmentOfDiseasesOfTheOralMucosa: card.generalTreatmentPlan.therapeuticTreatment?.treatmentOfDiseasesOfTheOralMucosa,
            therapeuticTreatmentOther: card.generalTreatmentPlan.therapeuticTreatment?.other,
            extractionOfTeethToots: card.generalTreatmentPlan.surgicalTreatment?.extractionOfTeethToots,
            outpatientSurgicalInterventionsOnSoftTissues: card.generalTreatmentPlan.surgicalTreatment?.outpatientSurgicalInterventionsOnSoftTissues,
            outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: card.generalTreatmentPlan.surgicalTreatment?.outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton,
            surgicalTreatmentOther: card.generalTreatmentPlan.surgicalTreatment?.other,
            orthopedicTreatment: card.generalTreatmentPlan.orthopedicTreatment,
            orthodonticTreatment: card.generalTreatmentPlan.orthodonticTreatment,
            additionalDiagnosticMeasures: card.generalTreatmentPlan.additionalDiagnosticMeasures,
            consultationOfOtherSpecialists: card.generalTreatmentPlan.consultationOfOtherSpecialists,
            doctorFio: ''
        }
    }
}
