import { Injectable } from "@nestjs/common";
import { DocxPage, GetPatchesParams } from "./docx-page";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPatch } from "docx";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../../schemas/patientCard.schema";
import { ICDSchema, ICD_COLLECTION } from "../../../../icd/icd.schema";
import { Result } from "../../../../../core/result";
import { Bite, ConditionOfTheOralMucosa, DentalFormula, KPI, OHIS, bitesReadable, conditionOfTheOralMucosaReadable, hardTissueConditionsReadable, periodontalConditionReadable } from "../../../schemas/dental-status.schema";

@Injectable()
export class DentalStatusPage extends DocxPage {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,

        @InjectModel(ICD_COLLECTION)
        private readonly icdModel: Model<ICDSchema>,
    ) {
        super("dentalStatus.docx")
    }

    public async getPatchesForTemplate({ cardId }: GetPatchesParams): Promise<Result<{ [key: string]: IPatch; }>> {
        const card = await this.cardModel.findById(cardId, { dentalStatus: 1 }).lean()

        if (!card) {
            return Result.err('Карточка не найдена!')
        }

        const data = await this.getData(card)

        console.log(data)

        const patches = Object
            .keys(data)
            .reduce<{ [key: string]: IPatch }>((res, key) => {

                let size;

                if (key in ['ohis', 'kpi']) {
                    Object.keys(data[key]).forEach((k => {
                        res[k] = this.getParagraphPatch({ text: data[key][k], size: '11pt' })
                    }))

                    size = '11pt'

                } else if (key === 'dentalFormula') {
                    size = '10pt'
                }

                if(size) {
                    Object.keys(data[key]).forEach((k => {
                        res[k] = this.getParagraphPatch({ text: data[key][k], size })
                    }))
                } else {
                    res[key] = this.getParagraphPatch({ text: data[key], size: '16pt' })
                }

                return res
            }, {})



        return Result.ok(patches)
    }

    private handleOhisKpiAndDentalStatusKeys(size: string, key: string, value: string, res) {
        Object.keys(key).forEach((k => {
            res[k] = this.getParagraphPatch({ text: value, size: '10pt' })
        }))
    }

    private async getData(card: IPatientCardSchema) {
        const { dentalStatus } = card

        return {
            bite: this.getBiteValue(dentalStatus.bite),
            hardTissueConditions: this.getFormattedString(dentalStatus.hardTissueConditions, hardTissueConditionsReadable),
            periodontalCondition: this.getFormattedString(dentalStatus.periodontalCondition, periodontalConditionReadable),
            conditionOfTheOralMucosa: this.geConditionOfTheOralMucosaValue(dentalStatus.conditionOfTheOralMucosa),
            researchData: dentalStatus.researchData || 'периапикальных изменений в области зуба нет',
            provisionalDiagnosis: await this.getDiagnosisFormatted(dentalStatus.provisionalDiagnosis, this.icdModel),
            ohis: this.getOhisValue(dentalStatus.ohis),
            kpi: this.getKpiValue(dentalStatus.kpi),
            dentalFormula: this.getDentalFormulaData(dentalStatus.dentalFormula)
        }
    }

    private getBiteValue(bite: Bite): string {
        return bite.map(v => bitesReadable[v]).join(', ')
    }

    private getFormattedString(obj, readable): string {
        const res = Object
            .keys(obj)
            .filter(k => !!obj[k])
            .map(k => readable[k])

        console.log(res)

        return res.length
            ? res.join(', ')
            : 'без видимых патологических изменений'
    }

    private geConditionOfTheOralMucosaValue(conditionOfTheOralMucosa: ConditionOfTheOralMucosa): string {
        const res = Object
            .keys(conditionOfTheOralMucosa)
            .filter(k => !!conditionOfTheOralMucosa[k])
            .map(k => {
                const value = conditionOfTheOralMucosa[k]
                if (typeof value === 'boolean') {
                    return conditionOfTheOralMucosaReadable[k]
                } else {
                    return value
                }
            })

        return res.length
            ? res.join(', ')
            : 'без видимых патологических изменений'
    }

    private getOhisValue(ohis: OHIS) {
        return ohis.reduce((res, value, i) => {
            res[`ohis1${i + 1}`] = value ? `${value[0]}/${value[1]}` : '-'
            return res
        }, {})
    }

    private getKpiValue(kpi: KPI) {
        return kpi.reduce((res, value, i) => {
            res[`kpi1${i + 1}`] = (value !== null) ? value.toString() : '-'
            return res
        }, {})
    }

    private getDentalFormulaData(dentalFormula: DentalFormula) {
        const res = {}

        dentalFormula.top.forEach((v, i) => {
            res[`top${i + 1}`] = v ? v : ''
        })

        dentalFormula.bottom.forEach((v, i) => {
            res[`bottom${i + 1}`] = v ? v : ''
        })

        return res
    }
}
