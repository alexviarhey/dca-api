import { patchDocument } from "docx";
import { Result } from "../../../../core/result";
import { GenderValues } from "../../../patients/types/gender";
import * as fs from 'fs'
import { PatchesHelper } from "./patches-helper";
import { Injectable } from "@nestjs/common";

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
    stateOfHealth: string
    commonDiseases: CommonDiseasesType,
    externalExamination: {
        faceConfiguration: string
        conditionOfTheSkinRedBorder: string
        lymphNodes: string
        temporomandibularJoint: string
    }
}

export type CommonDiseasesType = {
    cardiovascularSystem: CommonDiseasesInDocxData
    nervousSystem: CommonDiseasesInDocxData
    endocrineSystem: CommonDiseasesInDocxData
    digestiveSystem: CommonDiseasesInDocxData
    respiratorySystem: CommonDiseasesInDocxData
    allergicReactions: CommonDiseasesInDocxData
    continuousUseOfMedicines: CommonDiseasesInDocxData
    harmfulFactors: CommonDiseasesInDocxData
    pregnancyOrPostpartumPeriod: CommonDiseasesInDocxData
    infectiousDiseases: CommonDiseasesInDocxData
    other: string | null
}

export type CommonDiseasesInDocxData = {
    yes: boolean,
    value: string | null
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
}
