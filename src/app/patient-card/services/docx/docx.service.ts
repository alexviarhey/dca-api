import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../schemas/patientCard.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../../../../core/base.service";
import { DocxPages } from "../../dto/docx.dto";
import { DentalStatusPage } from "./pages/dental-status-page";
import { Result } from "../../../../core/result";
import { GeneralTreatmentPage } from "./pages/general-treatment-page";
import { VisitPage } from "./pages/visit.page";
import { GeneralInfoPage } from "./pages/general-info-page";
import { GeneralExaminationPage } from "./pages/general-examination.page";
import { DocxPage } from "./pages/docx-page";

type GetDocxParams = {
    cardId: string
    visitId: string
    page: DocxPages
}

@Injectable()
export class DocxService extends BaseService {

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,

        private readonly dentalStatusPage: DentalStatusPage,
        private readonly generalExaminationPage: GeneralExaminationPage,
        private readonly generalInfoPage: GeneralInfoPage,
        private readonly visitPage: VisitPage,
        private readonly generaTreatmentPage: GeneralTreatmentPage
    ) {
        super('DocxService')
    }

    public async getDocx({
        cardId,
        page,
        visitId
    }: GetDocxParams): Promise<Result<Buffer>> {

        let docxPage: DocxPage

        switch (page) {
            case DocxPages.GENERAL_INFO:
                docxPage = this.generaTreatmentPage
                break;
            case DocxPages.PATIENT_EXAMINATION_AT_INITIAL_PLACEMENT:
                docxPage = this.generalExaminationPage
                break;
            case DocxPages.GENERAL_TREATMENT_PLAN:
                docxPage = this.generaTreatmentPage
                break;
            case DocxPages.DENTAL_STATUS:
                docxPage = this.dentalStatusPage
                break
            case DocxPages.VISIT:
                docxPage = this.visitPage
                break
            default:
                return Result.err(`Sorry docx service for page ${page} not implemented!`)
        }

        return await docxPage.fillPlaceholdersInFile({ cardId, visitId })
    }
}
