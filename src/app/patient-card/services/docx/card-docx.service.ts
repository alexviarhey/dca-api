import { IPatch, PatchType, TextRun, UnderlineType, patchDocument } from "docx";
import { Result } from "../../../../core/result";
import { GenderValues } from "../../../patients/types/gender";
import * as fs from 'fs'
import { PatchesHelper } from "./patches-helper";


export type GeneralInfoDocxData = {
    createAt: Date,
    fullPatientName: string
    dateOfBirth: Date
    gender: GenderValues
    address: string
    phone: string
}

export class CardDocxService {

    constructor(
        private readonly patchesHelper: PatchesHelper
    ) {}

    public async getGeneralInfoPage(data: GeneralInfoDocxData): Promise<Result<Buffer>> {
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/first.docx')

            const doc = await patchDocument(content, {
                patches: this.patchesHelper.getGeneralInfoPatches(data)
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService getGeneralInfoPage error: ', e)
        }
    }
}
