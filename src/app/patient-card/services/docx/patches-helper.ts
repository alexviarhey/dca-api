import { Injectable } from "@nestjs/common";
import { IPatch, PatchType, TextRun, UnderlineType } from "docx";
import { CommonDiseasesInDocxData, GeneralInfoDocxData, GetPatientExaminationAtInitialPlacementPatchesData } from "./docx-templates.service";
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

        const stateOfHealth: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.complains,
                underline: this.underline,
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

                const item: CommonDiseasesInDocxData = data.commonDiseases[key]

                res[`${key}Yes`] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: 'ДА',
                        strike: item.yes,
                        ...this.getBasicTextSettings()
                    })]
                }

                res[`${key}No`] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: 'НЕТ',
                        strike: !item.yes,
                        ...this.getBasicTextSettings()
                    })]
                }

                res[key] = {
                    type: PatchType.PARAGRAPH,
                    children: [new TextRun({
                        text: item.value || '',
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
            stateOfHealth,
            ...commonDiseases,
            ...externalExamination
        }
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
}
