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
}
