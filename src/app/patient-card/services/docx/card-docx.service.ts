import { IPatch, PatchType, TextRun, UnderlineType, patchDocument } from "docx";
import { Result } from "../../../../core/result";
import { GenderValues } from "../../../patients/types/gender";
import * as fs from 'fs'







export type GeneralInfoCardPageData = {
    createAt: Date,
    fullPatientName: string
    dateOfBirth: Date
    gender: GenderValues
    address: string
    phone: string
}



export class CardDocxService {

    public async getGeneralInfoPage(data: GeneralInfoCardPageData): Promise<Result<Buffer>> {
        try {
            let content;

            try {
                content = fs.readFileSync(process.cwd() + '/templates/first.docx')
            } catch (e) {
                console.log('CardDocxService getGeneralInfoPage load template error: ', e)
                return Result.err('Template not found!')
            }

            const createdAt: IPatch = {
                type: PatchType.PARAGRAPH,
                children: [new TextRun({
                    text: data.createAt.toLocaleString("ru", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    }),
                    font: 'Times New Roman',
                    size: '16pt',
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
                    font: 'Times New Roman',
                    size: '16pt',
                })]
            }

            const full_name: IPatch = {
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

            const doc = await patchDocument(content, {
                patches: {
                    full_name: {
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
                },
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService getGeneralInfoPage error: ', e)
        }
    }


}
