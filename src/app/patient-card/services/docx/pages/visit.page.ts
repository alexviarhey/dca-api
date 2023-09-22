import { Injectable } from "@nestjs/common";
import { DocxPage, GetPatchesParams } from "./docx-page";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IPatch } from "docx";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../../schemas/patientCard.schema";
import { ICDSchema, ICD_COLLECTION } from "../../../../icd/icd.schema";
import { Result } from "../../../../../core/result";


@Injectable()
export class VisitPage extends DocxPage {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,

        @InjectModel(ICD_COLLECTION)
        private readonly icdModel: Model<ICDSchema>,
    ) {
        super("visit.docx")
    }

    public async getPatchesForTemplate({ cardId, visitId }: GetPatchesParams): Promise<Result<{ [key: string]: IPatch; }>> {
        const card = await this.cardModel.findById(
            cardId,
            {
                visits: { $elemMatch: { _id: visitId } },
            }
        )

        if (!card) {
            return Result.err('Карточка не найдена!')
        }

        if (!card.visits?.length || card.visits.length > 1) {
            return Result.err('Визит не найден!')
        }

        const visit = card.visits[0]

        const data = {
            complains: visit.complains,
            localStatus: visit.localStatus,
            treatment: visit.treatment,
            other: visit.other,
            date: this.getDate(visit.date),
            diagnosis: await this.getDiagnosisFormatted(visit.diagnosis, this.icdModel),
        }

        const patches = Object
            .keys(data)
            .reduce((res, key) => {
                res[key] = this.getParagraphPatch({text: data[key]})
                return res
            }, {})

        return Result.ok(patches)

    }

    private getDate(date: Date) {
        return new Date(date).toLocaleString(
            "ru",
            {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
            }
        )
    }
}
