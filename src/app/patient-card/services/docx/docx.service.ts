import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../schemas/patientCard.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../../../../core/base.service";
import { Result } from "../../../../core/result";
import { IPatientSchema, PATIENTS } from "../../../patients/schemas/patient.schema";
import { DocxTemplatesService } from "./docx-templates.service";
import { ContactPointSystem } from "../../../common/schemas/contact-point.schema";
import { DocxPages } from "../../dto/docx.dto";


@Injectable()
export class DocxService extends BaseService {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,

        @InjectModel(PATIENTS)
        private readonly patientModel: Model<IPatientSchema>,

        private readonly docxTemplatesService: DocxTemplatesService

    ) {
        super('DocxService')
    }

    public async getDocx(cardId: string, page: DocxPages): Promise<Result<Buffer>> {
        switch (page) {
            case DocxPages.GENERAL_INFO:
                return await this.getGeneralInfoDocxPage(cardId)
        }
    }

    public async getGeneralInfoDocxPage(cardId: string): Promise<Result<Buffer>> {
        try {

            const card = await this.cardModel.findById(cardId, {
                patientId: 1
            })
            if (!card) {
                return Result.err('Карточка не найдена!')
            }

            const patient = await this.patientModel.findById(card.patientId)
            if (!patient) {
                return Result.err('Пациент не найден!')
            }

            const { name, address, telecom, birthDate, gender, createdAt } = patient


            const doc = await this.docxTemplatesService.fillAndGetGeneralInfoPage({
                createAt: new Date(createdAt),
                fullPatientName: name.text,
                dateOfBirth: new Date(birthDate),
                gender: gender,
                address: address[0]?.text || '-',
                phone: telecom.find(t => t.system === ContactPointSystem.PHONE)?.value || '-',
                shortFio: `${name.lastName} ${name.firstName.charAt(0)}. ${name.given ? name.given.charAt(0) + '.' : ''}`
            })

            return doc

        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }
}
