import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { IPatientCardSchema, PATIENTS_CARDS_COLLECTION } from "../../schemas/patientCard.schema";
import { InjectModel } from "@nestjs/mongoose";
import { BaseService } from "../../../../core/base.service";
import { Result } from "../../../../core/result";
import { IPatientSchema, PATIENTS } from "../../../patients/schemas/patient.schema";
import { DentalFormulaData, DocxTemplatesService, GetDentalStatusPatchesData, GetGeneralTreatmentTypePatchesData, GetVisitPatchesData, KpiData, OhisData } from "./docx-templates.service";
import { ContactPointSystem } from "../../../common/schemas/contact-point.schema";
import { DocxPages } from "../../dto/docx.dto";
import { FaceConfiguration, FaceConfigurationReadable, LymphNodes, LymphNodesReadable, TemporomandibularJoint, TemporomandibularJointReadable } from "../../schemas/externalExamination";
import { Bite, ConditionOfTheOralMucosa, DentalFormula, HardTissueConditions, KPI, OHIS, bitesReadable, conditionOfTheOralMucosaReadable, hardTissueConditionsReadable, periodontalConditionReadable } from "../../schemas/dental-status.schema";
import { VisitDiagnosis } from "../../schemas/visit.schema";
import { ICDSchema, ICD_COLLECTION } from "../../../icd/icd.schema";

type GetDocxParams = {
    cardId: string
    visitId: string
    page: DocxPages
}

@Injectable()
export class DocxService extends BaseService {

    private noChangesValue = 'без видимых патологических изменений'

    constructor(
        @InjectModel(PATIENTS_CARDS_COLLECTION)
        private readonly cardModel: Model<IPatientCardSchema>,

        @InjectModel(PATIENTS)
        private readonly patientModel: Model<IPatientSchema>,

        @InjectModel(ICD_COLLECTION)
        private readonly icdModel: Model<ICDSchema>,

        private readonly docxTemplatesService: DocxTemplatesService

    ) {
        super('DocxService')
    }

    public async getDocx({
        cardId,
        page,
        visitId
    }: GetDocxParams): Promise<Result<Buffer>> {
        switch (page) {
            case DocxPages.GENERAL_INFO:
                return await this.getGeneralInfoDocxPage(cardId)
            case DocxPages.PATIENT_EXAMINATION_AT_INITIAL_PLACEMENT:
                return await this.getPatientExaminationAtInitialPlacementDocxPage(cardId)
            case DocxPages.GENERAL_TREATMENT_PLAN:
                return await this.getGeneralTreatmentPlanDocxPage(cardId)
            case DocxPages.DENTAL_STATUS:
                return await this.getDentalStatusDocxPage(cardId)
            case DocxPages.VISIT:
                return await this.getVisitDocxPage(cardId, visitId)
            default:
                return Result.err(`Sorry docx service for page ${page} not implemented!`)
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

    public async getPatientExaminationAtInitialPlacementDocxPage(cardId: string): Promise<Result<Buffer>> {
        try {

            const card = await this.cardModel.findById(cardId, {
                externalExamination: 1,
                commonDiseases: 1,
                createdAt: 1
            })
            if (!card) {
                return Result.err('Карточка не найдена!')
            }

            const { externalExamination, commonDiseases } = card

            const doc = await this.docxTemplatesService.fillAndGetPatientExaminationAtInitialPlacementPage({
                applicationDate: new Date(card.createdAt),
                complains: card.externalExamination.complaints,
                commonDiseases: {
                    stateOfHealth: commonDiseases.stateOfHealth,
                    cardiovascularSystem: commonDiseases.cardiovascularSystem,
                    nervousSystem: commonDiseases.nervousSystem,
                    endocrineSystem: commonDiseases.endocrineSystem,
                    digestiveSystem: commonDiseases.digestiveSystem,
                    respiratorySystem: commonDiseases.respiratorySystem,
                    allergicReactions: commonDiseases.allergicReactions,
                    continuousUseOfMedicines: commonDiseases.continuousUseOfMedicines,
                    harmfulFactors: commonDiseases.harmfulFactors,
                    pregnancyOrPostpartumPeriod: commonDiseases.pregnancyOrPostpartumPeriod,
                    infectiousDiseases: commonDiseases.infectiousDiseases,
                    other: commonDiseases.other
                },

                externalExamination: {
                    conditionOfTheSkinRedBorder: externalExamination.conditionOfTheSkinRedBorder || 'без видимых паталогоческих изменений',
                    faceConfiguration: externalExaminationItemToReadable<FaceConfiguration>(externalExamination.faceConfiguration, FaceConfigurationReadable),
                    lymphNodes: externalExaminationItemToReadable<LymphNodes>(externalExamination.lymphNodes, LymphNodesReadable),
                    temporomandibularJoint: externalExaminationItemToReadable<TemporomandibularJoint>(externalExamination.temporomandibularJoint, TemporomandibularJointReadable)
                }
            })

            function externalExaminationItemToReadable<T extends number>(values: T[], readable: Record<T, string>): string {
                return values
                    .map(v => readable[v])
                    .join(', ')
            }

            return doc

        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }

    public async getGeneralTreatmentPlanDocxPage(cardId: string): Promise<Result<Buffer>> {
        try {

            const card = await this.cardModel.findById(cardId, { generalTreatmentPlan: 1 })
            if (!card) {
                return Result.err('Карточка не найдена!')
            }

            const data: GetGeneralTreatmentTypePatchesData = {
                emergencyCare: card.generalTreatmentPlan.emergencyCare,
                motivationByRiskFactorsAndHygieneEducation: card.generalTreatmentPlan.preventiveActions.motivationByRiskFactorsAndHygieneEducation,
                professionalHygiene: card.generalTreatmentPlan.preventiveActions.professionalHygiene,
                preventiveActionsOther: card.generalTreatmentPlan.preventiveActions.other,
                replacementOfFillings: card.generalTreatmentPlan.therapeuticTreatment.replacementOfFillings,
                treatmentOfCariesAndNonCariousLesions: card.generalTreatmentPlan.therapeuticTreatment.treatmentOfCariesAndNonCariousLesions,
                endodonticTreatment: card.generalTreatmentPlan.therapeuticTreatment.endodonticTreatment,
                periodontalTreatment: card.generalTreatmentPlan.therapeuticTreatment.periodontalTreatment,
                treatmentOfDiseasesOfTheOralMucosa: card.generalTreatmentPlan.therapeuticTreatment.treatmentOfDiseasesOfTheOralMucosa,
                therapeuticTreatmentOther: card.generalTreatmentPlan.therapeuticTreatment.other,
                extractionOfTeethToots: card.generalTreatmentPlan.surgicalTreatment.extractionOfTeethToots,
                outpatientSurgicalInterventionsOnSoftTissues: card.generalTreatmentPlan.surgicalTreatment.outpatientSurgicalInterventionsOnSoftTissues,
                outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: card.generalTreatmentPlan.surgicalTreatment.outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton,
                surgicalTreatmentOther: card.generalTreatmentPlan.surgicalTreatment.other,
                orthopedicTreatment: card.generalTreatmentPlan.orthopedicTreatment,
                orthodonticTreatment: card.generalTreatmentPlan.orthodonticTreatment,
                additionalDiagnosticMeasures: card.generalTreatmentPlan.additionalDiagnosticMeasures,
                consultationOfOtherSpecialists: card.generalTreatmentPlan.consultationOfOtherSpecialists,
                doctorFio: 'А.С. Ярош'
            }

            return this.docxTemplatesService.fillAndGetGeneralTreatmentPlanPage(data)
        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }

    public async getDentalStatusDocxPage(cardId: string): Promise<Result<Buffer>> {
        try {

            const card = await this.cardModel.findById(cardId, { dentalStatus: 1 })
            if (!card) {
                return Result.err('Карточка не найдена!')
            }

            const { dentalStatus } = card

            const data: GetDentalStatusPatchesData = {
                bite: getBiteValue(dentalStatus.bite),
                hardTissueConditions: getFormattedString(dentalStatus.hardTissueConditions, hardTissueConditionsReadable),
                periodontalCondition: getFormattedString(dentalStatus.periodontalCondition, periodontalConditionReadable),
                conditionOfTheOralMucosa: geConditionOfTheOralMucosaValue(dentalStatus.conditionOfTheOralMucosa),
                researchData: dentalStatus.researchData || 'периапикальных изменений в области зуба нет',
                provisionalDiagnosis: await this.getDiagnosisFormatted(dentalStatus.provisionalDiagnosis),
                ohis: getOhisValue(dentalStatus.ohis),
                kpi: getKpiValue(dentalStatus.kpi),
                dentalFormula: getDentalFormulaData(dentalStatus.dentalFormula)
            }

            function getBiteValue(bite: Bite): string {
                return bite.map(v => bitesReadable[v]).join(', ')
            }

            function getFormattedString(obj, readable): string {
                const res = Object
                    .keys(obj)
                    .filter(k => !!obj[k])
                    .map(k => readable[k])

                return res.length
                    ? res.join(', ')
                    : this.noChangesValue
            }

            function geConditionOfTheOralMucosaValue(conditionOfTheOralMucosa: ConditionOfTheOralMucosa): string {
                const res = Object
                    .keys(conditionOfTheOralMucosa)
                    .filter(k => !!conditionOfTheOralMucosa[k])
                    .map(k => {
                        const value = conditionOfTheOralMucosa[k]
                        if (typeof value === 'boolean') {
                            return conditionOfTheOralMucosaReadable[k]
                        } else {
                            return value
                        }
                    })

                return res.length
                    ? res.join(', ')
                    : this.noChangesValue
            }

            function getOhisValue(ohis: OHIS): OhisData {
                const res = ohis.reduce((res, value, i) => {
                    res[`ohis1${i + 1}`] = value ? `${value[0]}/${value[1]}` : '-'
                    return res
                }) as unknown as OhisData

                return res
            }

            function getKpiValue(kpi: KPI): KpiData {
                const res = kpi.reduce((res, value, i) => {
                    res[`kpi1${i + 1}`] = (value !== null) ? value.toString() : '-'
                    return res
                }) as unknown as KpiData

                return res
            }

            function getDentalFormulaData(dentalFormula: DentalFormula): DentalFormulaData {
                return Object.keys(dentalFormula).reduce((res, key) => {
                    const k = (key === 'top') ? 'top' : 'bot'
                    res[k] = {}

                    dentalFormula[key].forEach((v, i) => {
                        res[k][`${k}${i + 1}`] = v ? v : ''
                    })

                    return res
                }, {}) as unknown as DentalFormulaData
            }

            return this.docxTemplatesService.fillAndGetDentalStatusPage(data)
        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }

    public async getVisitDocxPage(cardId: string, visitId: string): Promise<Result<Buffer>> {
        try {

            const card = await this.cardModel.findById(
                cardId,
                {
                    visits: { $elemMatch: { _id: visitId } },
                }
            )

            if (!card) {
                return Result.err('Карточка не найдена!')
            }

            if (!card.visits.length || card.visits.length > 1) {
                return Result.err('Визит не найден!')
            }

            const visit = card.visits[0]

            const data: GetVisitPatchesData = {
                date: getDateFormatted(visit.date),
                complains: visit.complains,
                localStatus: visit.localStatus,
                diagnosis: await this.getDiagnosisFormatted(visit.diagnosis),
                treatment: visit.treatment,
                other: visit.other
            }

            function getDateFormatted(date: Date): string {
                return new Date(visit.date).toLocaleString(
                    "ru",
                    {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }
                )
            }

            return this.docxTemplatesService.fillAndGetVisitPage(data)

        } catch (e) {
            return this.errorLogger.logErrorAndReturnSomethingWentWrongResult(e)
        }
    }

    private async getDiagnosisFormatted(diagnosis: VisitDiagnosis[]): Promise<string[]> {

       const icds = await this.icdModel.find({
        _id: {$in: diagnosis.map(d => d.icdId)}
       })

        return diagnosis
            .map(d => {
                let icd = icds.find(icd => icd._id === d.icdId)
                let res = icd.code + ' ' + icd.name
                if (d.tooth) res += ' ' + d.tooth
                return res
            })
    }
}
