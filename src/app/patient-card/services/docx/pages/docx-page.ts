import * as fs from 'fs'
import { IPatch, PatchType, UnderlineType, patchDocument } from "docx";
import { Model } from 'mongoose';
import { Result } from '../../../../../core/result';
import { VisitDiagnosis } from '../../../schemas/visit.schema';
import { ICDSchema } from '../../../../icd/icd.schema';

type GetParagraphPatchOptions = {
    text: string,
    underline?: boolean,
    bold?: boolean,
    size?: string,
    type?: UnderlineType
    strike?: boolean
    italics?: boolean
}

export type GetPatchesParams = {
    cardId: string
    visitId?: string
}

export abstract class DocxPage {
    constructor(
        private readonly fileName: string,

    ) { }

    protected abstract getPatchesForTemplate(params: GetPatchesParams): Promise<Result<{ [key: string]: IPatch }>>

    public async fillPlaceholdersInFile(params: GetPatchesParams): Promise<Result<Buffer>> {
        try {

            const getPatchesRes = await this.getPatchesForTemplate(params)
            if (!getPatchesRes.isSuccess) return getPatchesRes.mapErr()

            return Result.ok(
                await patchDocument(
                    this.getContentOfFile(),
                    { patches: getPatchesRes.data }
                )
            )

        } catch (e) {
            console.log(`DocxPage error with file ${this.fileName}: `, e)
            return Result.somethingWentWrong()
        }
    }

    private getContentOfFile(): Buffer {
        return fs.readFileSync(process.cwd() + `/templates/fileName`)
    }

    protected async getDiagnosisFormatted(diagnosis: VisitDiagnosis[], model: Model<ICDSchema>): Promise<string[]> {

        const icds = await model.find({
            _id: { $in: diagnosis.map(d => d.icdId) }
        })

        return diagnosis
            .map(d => {
                let icd = icds.find(icd => icd._id.toString() === d.icdId)
                let res = icd.code + ' ' + icd.name
                if (d.tooth) res += ' ' + d.tooth
                return res
            })
    }

    protected getParagraphPatch(data: GetParagraphPatchOptions[] | GetParagraphPatchOptions): IPatch {
        if (!Array.isArray(data)) {
            data = [data]
        }

        return data.reduce((res, c) => {
            const iRunOptions = {
                text: c.text,
                bold: !!c.bold,
                strike: !!c.strike,
                italics: !!c.italics,
                color: '#000000',
                font: 'Times New Roman',
                size: '16pt',
                underline: c.underline ? { color: '#000000', type: UnderlineType.SINGLE } : undefined
            }

            if (c.size) {
                iRunOptions.size = c.size
            }

            res.children.push(iRunOptions)

            return res
        }, {
            type: PatchType.PARAGRAPH,
            children: []
        })
    }
}
