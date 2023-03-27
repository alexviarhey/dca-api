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
        complaints: { type: 'string', nullable: true },
        conditionOfTheSkinRedBorder: { type: 'string', nullable: true },
        faceConfiguration: { type: 'array', enum: Object.values(FaceConfiguration) },
        lymphNodes: { type: 'array', enum: Object.values(LymphNodes) },
        temporomandibularJoint: { type: 'array', enum: Object.values(TemporomandibularJoint) },
    }
};
