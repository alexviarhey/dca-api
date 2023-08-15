import { patchDocument } from "docx";
import { Result } from "../../../../core/result";
import { GenderValues } from "../../../patients/types/gender";
import * as fs from 'fs'
import { PatchesHelper } from "./patches-helper";
import { Injectable } from "@nestjs/common";
import { PreventiveActions, SurgicalTreatment, TherapeuticTreatment } from "../../schemas/general-treatment-plan.schema";

export type GeneralInfoDocxData = {
    createAt: Date,
    fullPatientName: string
    dateOfBirth: Date
    gender: GenderValues
    address: string
    phone: string
    shortFio: string
}


export type GetPatientExaminationAtInitialPlacementPatchesData = {
    applicationDate: Date
    complains: string
    commonDiseases: {
        stateOfHealth: string
        cardiovascularSystem: string | null
        nervousSystem: string | null
        endocrineSystem: string | null
        digestiveSystem: string | null
        respiratorySystem: string | null
        allergicReactions: string | null
        continuousUseOfMedicines: string | null
        harmfulFactors: string | null
        pregnancyOrPostpartumPeriod: string | null
        infectiousDiseases: string | null
        other: string | null
    },
    externalExamination: {
        faceConfiguration: string
        conditionOfTheSkinRedBorder: string
        lymphNodes: string
        temporomandibularJoint: string
    }
}

export type GetGeneralTreatmentTypePatchesData = {
    emergencyCare: string | null;
    motivationByRiskFactorsAndHygieneEducation: boolean;
    professionalHygiene: boolean;
    preventiveActionsOther: string | null;
    replacementOfFillings: string | null;
    treatmentOfCariesAndNonCariousLesions: string | null;
    endodonticTreatment: string | null;
    periodontalTreatment: string | null
    treatmentOfDiseasesOfTheOralMucosa: string | null;
    therapeuticTreatmentOther: string | null;
    extractionOfTeethToots: string | null;
    outpatientSurgicalInterventionsOnSoftTissues: string | null;
    outpatientSurgicalInterventionsOnTheBonesOfTheFacialSkeleton: string | null;
    surgicalTreatmentOther: string | null;
    orthopedicTreatment: string | null;
    orthodonticTreatment: string | null;
    additionalDiagnosticMeasures: string | null;
    consultationOfOtherSpecialists: string | null;
    doctorFio: string
}


export type GetDentalStatusPatchesData = {
    bite: string
    hardTissueConditions: string
    periodontalCondition: string
    conditionOfTheOralMucosa: string
    researchData: string
    provisionalDiagnosis: string
    ohis: OhisData
    kpi: KpiData
    dentalFormula: DentalFormulaData
}

export type OhisData = {
    ohis11: string,
    ohis12: string,
    ohis13: string,
    ohis14: string,
    ohis15: string,
    ohis16: string,
}

export type KpiData = {
    kpi11: string,
    kpi12: string,
    kpi13: string,
    kpi14: string,
    kpi15: string,
    kpi16: string,
}

export type DentalFormulaData = {
    top: { top1: string, top2: string, top3: string, top4: string, top5: string, top6: string, top7: string, top8: string, top9: string, top10: string, top11: string, top12: string, top13: string, top14: string, top15: string, top16: string},
    bot: {bot1: string, bot2: string, bot3: string, bot4: string, bot5: string, bot6: string, bot7: string, bot8: string, bot9: string, bot10: string, bot11: string, bot12: string, bot13: string, bot14: string, bot15: string, bot16: string}
}


export type GetVisitPatchesData = {
    date: string
    complains: string
    localStatus: string
    diagnosis: string[]
    treatment: string
    other: string
}

@Injectable()
export class DocxTemplatesService {

    constructor(
        private readonly patchesHelper: PatchesHelper
    ) { }

    public async fillAndGetGeneralInfoPage(data: GeneralInfoDocxData): Promise<Result<Buffer>> {
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/generalInfo.docx')

            const doc = await patchDocument(content, {
                patches: this.patchesHelper.getGeneralInfoPatches(data)
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService fillAndGetGeneralInfoPage error: ', e)
        }
    }

    public async fillAndGetPatientExaminationAtInitialPlacementPage(data: GetPatientExaminationAtInitialPlacementPatchesData): Promise<Result<Buffer>> {
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/patientExaminationAtInitialPlacement.docx')

            const doc = await patchDocument(content, {
                patches: this.patchesHelper.getPatientExaminationAtInitialPlacementPatches(data)
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService fillAndGetPatientExaminationAtInitialPlacementPage error: ', e)
        }
    }

    public async fillAndGetGeneralTreatmentPlanPage(data: GetGeneralTreatmentTypePatchesData): Promise<Result<Buffer>> {
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/generalTreatmentPlan.docx')

            const doc = await patchDocument(content, {
                patches: this.patchesHelper.getGeneralTreatmentPlanPatches(data)
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService fillAndGetPatientExaminationAtInitialPlacementPage error: ', e)
        }
    }

    public async fillAndGetDentalStatusPage(data: GetDentalStatusPatchesData): Promise<Result<Buffer>> {
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/dentalStatus.docx')

            const doc = await patchDocument(content, {
                patches: this.patchesHelper.getDentalStatusPatches(data)
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService fillAndGetPatientExaminationAtInitialPlacementPage error: ', e)
        }
    }

    public async fillAndGetVisitPage(data: GetVisitPatchesData): Promise<Result<Buffer>> {
        try {
            const content = fs.readFileSync(process.cwd() + '/templates/visit.docx')

            const doc = await patchDocument(content, {
                patches: this.patchesHelper.getVisitPatches(data)
            });

            return Result.ok(doc)

        } catch (e) {
            console.log('CardDocxService fillAndGetVisitPate error: ', e)
        }
    }
}
