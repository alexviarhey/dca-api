import { FaceConfiguration, LymphNodes, TemporomandibularJoint} from "../schemas/externalExamination";

export type ExternalExaminationDto = {
    complaints: string | null
    conditionOfTheSkinRedBorder: string | null
    faceConfiguration: FaceConfiguration[]
    lymphNodes: LymphNodes[]
    temporomandibularJoint: TemporomandibularJoint[]
}

export const externalExaminationAjvSchema = {
    type: "object",
    additionalProperties: false,
    allRequired: true,
    properties: {
        complains: { type: 'string', nullable: true },
        conditionOfTheSkinRedBorder: { type: 'string', nullable: true },
        faceConfiguration: { enum: Object.values(FaceConfiguration) },
        lymphNodes: {  enum: Object.values(LymphNodes) },
        temporomandibularJoint: {  enum: Object.values(TemporomandibularJoint) },
    }
};
