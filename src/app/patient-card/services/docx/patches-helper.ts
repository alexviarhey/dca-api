import { Injectable } from "@nestjs/common";
import { IPatch, PatchType, TextRun, UnderlineType } from "docx";
import { GeneralInfoDocxData } from "./docx-templates.service";
import { GenderValues } from "../../../patients/types/gender";

export type PatchObj = {
    [key: string]: IPatch
}

type BasicTextSettingsParams = {
    bold?: boolean,
    underline?: boolean
}

@Injectable()
export class PatchesHelper {

    public getGeneralInfoPatches(data: GeneralInfoDocxData): PatchObj {

        const createdAt: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: this.formatDate(data.createAt),
                ...this.getBasicTextSettings({ bold: false, underline: false })
            })]
        }

        const fullName: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.fullPatientName,
                ...this.getBasicTextSettings()
            })]
        }

        const dateOfBirth: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: this.formatDate(data.dateOfBirth),
                ...this.getBasicTextSettings({ bold: true })
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

        const shortFio: IPatch = {
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
            shortFio: shortFio
        }
    }

    private getBasicTextSettings(params?: BasicTextSettingsParams) {
        const res: any = {
            font: 'Times New Roman',
            size: '16pt',
        }

        let bold = true
        let underline = true

        if (typeof params?.bold === 'boolean') {
            bold = params.bold
        }

        res.bold = bold

        if (typeof params?.underline === 'boolean') {
            underline = params.underline
        }

        underline && (res.underline = {
            color: '#000000',
            type: UnderlineType.SINGLE
        })

        return res
    }

    private formatDate(date: Date): string {
        return date.toLocaleString("ru", {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }
}
