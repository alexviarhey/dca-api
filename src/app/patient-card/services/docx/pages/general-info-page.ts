import { IPatch } from "docx";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { DocxPage, GetPatchesParams } from './docx-page';
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../../schemas/patientCard.schema";
import { IPatientSchema, PATIENTS } from "../../../../patients/schemas/patient.schema";
import { Result } from "../../../../../core/result";
import { ContactPointSystem } from "../../../common/schemas/contact-point.schema";
import { GenderValues } from "../../../../patients/types/gender";

@Injectable()
export class GeneralInfoPage extends DocxPage {
    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,

        @InjectModel(PATIENTS)
        private readonly patientModel: Model<IPatientSchema>,
    ) {
        super("generalInfo.docx")
    }

    public async getPatchesForTemplate({ cardId }: GetPatchesParams): Promise<Result<{ [key: string]: IPatch }>> {
        const card = await this.cardModel.findById(cardId, { patientId: 1 }).lean()

        if (!card) {
            return Result.err('Карточка не найдена!')
        }

        const patient = await this.patientModel.findById(card.patientId).lean()

        if (!patient) {
            return Result.err('Пациент не найден!')
        }

        const createdAt = this.getParagraphPatch({ text: getCreatedAtPatchText() })

        const fullName = this.getParagraphPatch({ text: patient.name.text, bold: true, underline: true })

        const dateOfBirth = this.getParagraphPatch({ text: getDateOfBirthPatchText(), bold: true })

        const address = this.getParagraphPatch({ text: this.getAddressPatchText(patient), bold: true, underline: true })

        const phone = this.getParagraphPatch({ text: this.getPhonePatchText(patient) })

        const fio = this.getParagraphPatch({ text: this.getFioPatchText(patient) })

        const gender = this.getParagraphPatch([
            { text: 'M', size: '18pt', bold: true, strike: this.getIsMale(patient) },
            { text: '/', size: '18pt' },
            { text: 'Ж', size: '18pt', bold: true, strike: !this.getIsMale(patient) },
        ])

        function getCreatedAtPatchText(): string {
            return new Date(patient.createdAt).toLocaleString("ru", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        }

        function getDateOfBirthPatchText(): string {
            return new Date(patient.birthDate).toLocaleString("ru", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })
        }



        return Result.ok({
            createdAt,
            fullName,
            dateOfBirth,
            gender,
            address,
            phone,
            fio
        })
    }

    private getAddressPatchText(patient: IPatientSchema): string {
        return patient.address[0]?.text || '-'
    }

    private getPhonePatchText(patient: IPatientSchema): string {
        return patient.telecom.find(t => t.system === ContactPointSystem.PHONE)?.value || '-'
    }

    private getFioPatchText(patient: IPatientSchema): string {
        return `${patient.name.lastName} ${patient.name.firstName.charAt(0)}. ${patient.name.given ? patient.name.given.charAt(0) + '.' : ''}`
    }

    private getIsMale(patient: IPatientSchema): boolean {
        return patient.gender === GenderValues.MALE
    }
}
