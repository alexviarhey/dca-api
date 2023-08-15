import { Injectable } from "@nestjs/common";
import { IPatch, PatchType, TextRun, UnderlineType } from "docx";
import { GeneralInfoDocxData, GetDentalStatusPatchesData, GetGeneralTreatmentTypePatchesData, GetPatientExaminationAtInitialPlacementPatchesData, GetVisitPatchesData } from "./docx-templates.service";
import { GenderValues } from "../../../patients/types/gender";

export type PatchObj = {
    [key: string]: IPatch
}

@Injectable()
export class PatchesHelper {

    private readonly underline = {
        color: '#000000',
        type: UnderlineType.SINGLE
    }

    private readonly noDataText = 'НЕТ'

    public getGeneralInfoPatches(data: GeneralInfoDocxData): PatchObj {

        const createdAt: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: this.formatDate(data.createAt),
                ...this.getBasicTextSettings()
            })]
        }

        const fullName: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.fullPatientName,
                bold: true,
                underline: this.underline,
                ...this.getBasicTextSettings()
            })]
        }

        const dateOfBirth: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: this.formatDate(data.dateOfBirth),
                bold: true,
                ...this.getBasicTextSettings()
            })]
        }

        const isMale = data.gender === GenderValues.MALE
        const size = '18pt'
        const bold = true

        const gender: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [
                new TextRun({ text: 'M', size, bold, strike: isMale }),
                new TextRun({ text: '/', size, bold: false }),
                new TextRun({ text: 'Ж', size, bold, strike: !isMale })
            ]
        }

        const address: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.address,
                bold: true,
                underline: this.underline,
                ...this.getBasicTextSettings()
            })]
        }

        const phone: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.phone,
                ...this.getBasicTextSettings()
            })]
        }

        const fioShort: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.shortFio,
                ...this.getBasicTextSettings()
            })]
        }

        return {
            createdAt,
            fullName,
            dateOfBirth,
            gender,
            address,
            phone,
            fioShort
        }
    }


    public getPatientExaminationAtInitialPlacementPatches(data: GetPatientExaminationAtInitialPlacementPatchesData): PatchObj {
        const applicationDate: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: this.formatDate(data.applicationDate),
                ...this.getBasicTextSettings()
            })]
        }

        const complains: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.complains,
                italics: true,
                ...this.getBasicTextSettings()
            })]
        }

        const commonDiseases = Object
            .keys(data.commonDiseases)
            .reduce<Record<string, IPatch>>((res, key) => {

                if (key === 'other') {
                    res.other = {
                        type: PatchType.PARAGRAPH,
                        children: [new TextRun({
                            text: data.commonDiseases.other || '',
                            ...this.getBasicTextSettings()
                        })]
                    }

                    return res
                }

                if (key === 'stateOfHealth') {
                    res.stateOfHealth = {
                        type: PatchType.PARAGRAPH,
                        children: [new TextRun({
                            text: data.commonDiseases.stateOfHealth || '',
                            ...this.getBasicTextSettings()
                        })]
                    }

                    return res
                }

                const value: string = data.commonDiseases[key]

                res[`${key}Yes`] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: 'ДА',
                        strike: !!!value,
                        ...this.getBasicTextSettings()
                    })]
                }

                res[`${key}No`] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: 'НЕТ',
                        strike: !!value,
                        ...this.getBasicTextSettings()
                    })]
                }

                res[key] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: value || '',
                        ...this.getBasicTextSettings()
                    })]
                }

                return res
            }, {})

        const externalExamination = Object
            .keys(data.externalExamination)
            .reduce<Record<string, IPatch>>((res, key) => {
                const value = data.externalExamination[key]

                res[key] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: value,
                        italics: true,
                        ...this.getBasicTextSettings()
                    })]
                }

                return res
            }, {})

        return {
            applicationDate,
            complains,
            ...commonDiseases,
            ...externalExamination
        }
    }

    public getGeneralTreatmentPlanPatches(data: GetGeneralTreatmentTypePatchesData): PatchObj {

        return Object
            .keys(data)
            .reduce<PatchObj>((res, key) => {
                const value = data[key]

                if (typeof value === 'boolean') {

                    const text = value ? 'ДА' : this.noDataText

                    res[key] = {
                        type: PatchType.PARAGRAPH,
                        children: [new TextRun({
                            text,
                            underline: this.underline,
                            ...this.getBasicTextSettings()
                        })]
                    }
                } else {
                    res[key] = {
                        type: PatchType.PARAGRAPH,
                        children: [new TextRun({
                            text: this.withNoDataText(value),
                            underline: this.underline,
                            ...this.getBasicTextSettings()
                        })]
                    }
                }

                return res
            }, {})
    }

    public getDentalStatusPatches(data: GetDentalStatusPatchesData): PatchObj {
        return Object
            .keys(data)
            .reduce<PatchObj>((res, key) => {

                let size: string;

                if (key in ['ohis', 'kpi']) {
                    size = '11pt'
                } else if (key === 'dentalFormula') {
                    size = '10pt'
                } else {
                    size = '16pt'
                }

                res[key] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: data[key],
                        ...this.getBasicTextSettings(),
                        size
                    })]
                }

                if(key === 'provisionalDiagnosis') {
                    res[key] = {
                        type: PatchType.PARAGRAPH,
                        children: data.provisionalDiagnosis.map(d => (
                            new TextRun({
                                text: d,
                                ...this.getBasicTextSettings(),
                            })))
                    }
                }

                return res
            }, {})
    }

    public getVisitPatches(data: GetVisitPatchesData): PatchObj {
        return Object
            .keys(data)
            .reduce<PatchObj>((res, key) => {
                if (key !== 'diagnosis') {
                    res[key] = {
                        type: PatchType.PARAGRAPH,
                        children: [new TextRun({
                            text: data[key],
                            ...this.getBasicTextSettings(),
                        })]
                    }
                } else {
                    res[key] = {
                        type: PatchType.PARAGRAPH,
                        children: data.diagnosis.map(d => (
                            new TextRun({
                                text: d,
                                ...this.getBasicTextSettings(),
                            })))
                    }
                }
                return res
            }, {})
    }

    private getBasicTextSettings() {
        return {
            font: 'Times New Roman',
            size: '16pt',
        } as any
    }

    private formatDate(date: Date): string {
        return date.toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    private withNoDataText(value: string | null, customNoDataText?: string) {
        return value ? value : (customNoDataText ? customNoDataText : this.noDataText)
    }
}
