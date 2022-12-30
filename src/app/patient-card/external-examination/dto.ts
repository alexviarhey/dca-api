import { FaceConfiguration, LymphNodes, TemporomandibularJoint } from "../schemas/externalExamination";


export class ExternalExaminationDto {
    complaints: string | null
    faceConfiguration: FaceConfiguration[]
    conditionOfTheSkinRedBorder: string | null
    lymphNodes: LymphNodes[]
    temporomandibularJoint: TemporomandibularJoint[]
}




