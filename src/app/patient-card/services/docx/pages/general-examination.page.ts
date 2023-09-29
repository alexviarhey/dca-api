import { Injectable } from "@nestjs/common";
import { DocxPage, GetPatchesParams } from "./docx-page";
import { IPatch } from "docx";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../../schemas/patientCard.schema";
import { Result } from "../../../../../core/result";
import { FaceConfiguration, FaceConfigurationReadable, LymphNodes, LymphNodesReadable, TemporomandibularJoint, TemporomandibularJointReadable } from "../../../schemas/externalExamination";

@Injectable()
export class GeneralExaminationPage extends DocxPage {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,
    ) {
        super("generalExamination.docx")
    }

    public async getPatchesForTemplate({cardId}: GetPatchesParams): Promise<Result<{ [key: string]: IPatch }>> {
        const card = await this.cardModel.findById(cardId, {
            externalExamination: 1,
            commonDiseases: 1,
            createdAt: 1
        })

        if (!card) {
            return Result.err('Карточка не найдена!')
        }

        const applicationDate = this.getParagraphPatch({ text: this.getApplicationDatePatchText(card.createdAt) })

        const complains = this.getParagraphPatch({ text: card.externalExamination.complaints, italics: true })

        const commonDiseasesData = this.getCommonDiseasesData(card)

        const commonDiseases = Object
            .keys(commonDiseasesData)
            .reduce<Record<string, IPatch>>((res, key) => {

                const value: string = commonDiseasesData[key]

                if (['other', 'stateOfHealth'].includes(key)) {
                    res[key] = this.getParagraphPatch({ text: value || '' })
                    return res
                }

                res[`${key}Yes`] = this.getParagraphPatch({ text: 'ДА', strike: !!!value })
                res[`${key}No`] = this.getParagraphPatch({ text: 'НЕТ', strike: !!value })
                res[key] = this.getParagraphPatch({ text: value || '' })

                return res
            }, {})

        const externalExaminationData = this.getExternalExaminationData(card)

        const externalExamination = Object
            .keys(externalExaminationData)
            .reduce<Record<string, IPatch>>((res, key) => {
                const value = externalExaminationData[key]

                res[key] = this.getParagraphPatch({ text: value, italics: true })

                return res
            }, {})

        return Result.ok({
            applicationDate,
            complains,
            ...commonDiseases,
            ...externalExamination
        })
    }

    private getCommonDiseasesData(card: IPatientCardSchema) {
        return {
            stateOfHealth: card.commonDiseases.stateOfHealth,
            cardiovascularSystem: card.commonDiseases.cardiovascularSystem,
            nervousSystem: card.commonDiseases.nervousSystem,
            endocrineSystem: card.commonDiseases.endocrineSystem,
            digestiveSystem: card.commonDiseases.digestiveSystem,
            respiratorySystem: card.commonDiseases.respiratorySystem,
            allergicReactions: card.commonDiseases.allergicReactions,
            continuousUseOfMedicines: card.commonDiseases.continuousUseOfMedicines,
            harmfulFactors: card.commonDiseases.harmfulFactors,
            pregnancyOrPostpartumPeriod: card.commonDiseases.pregnancyOrPostpartumPeriod,
            infectiousDiseases: card.commonDiseases.infectiousDiseases,
            other: card.commonDiseases.other
        }
    }

    private getExternalExaminationData(card: IPatientCardSchema) {
        return {
            faceConfiguration: this.externalExaminationItemToReadable<FaceConfiguration>(card.externalExamination.faceConfiguration, FaceConfigurationReadable),
            lymphNodes: this.externalExaminationItemToReadable<LymphNodes>(card.externalExamination.lymphNodes, LymphNodesReadable),
            temporomandibularJoint: this.externalExaminationItemToReadable<TemporomandibularJoint>(card.externalExamination.temporomandibularJoint, TemporomandibularJointReadable),
            conditionOfTheSkinRedBorder: card.externalExamination.conditionOfTheSkinRedBorder || 'без видимых патологоческих изменений',
        }
    }

    private externalExaminationItemToReadable<T extends number>(values: T[], readable: Record<T, string>): string {
        return values
            .map(v => readable[v])
            .join(', ')
    }

    private getApplicationDatePatchText(createdAt: Date): string {
        return new Date(createdAt).toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

}
