import { Injectable } from "@nestjs/common";
import { IPatch, IRunOptions, PatchType, TextRun, UnderlineType } from "docx";
import { GeneralInfoDocxData } from "./card-docx.service";

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

        const dateOfBirth: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: data.dateOfBirth.toLocaleString("ru", {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                }),
                bold: true,
                font: 'Times New Roman',
                size: '16pt',
            })]
        }

        const fullName: IPatch = {
            type: PatchType.PARAGRAPH,
            children: [new TextRun({
                text: 'Иванов Иван Иванович',
                bold: true,
                font: 'Times New Roman',
                size: '16pt',
                underline: {
                    color: '#000000',
                    type: UnderlineType.SINGLE
                }
            })]
        }

        return {
            createdAt,
            dateOfBirth,
            fullName
        }
    }

    private getBasicTextSettings(params?: BasicTextSettingsParams) {
        const res: any = {
            font: 'Times New Roman',
            size: '16pt',
        }

        let bold = true
        let underline = true

        if (typeof params.bold === 'boolean') {
            bold = params.bold
        }

        res.bold = bold

        if (typeof params.underline === 'boolean') {
            underline = params.underline
        }


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
