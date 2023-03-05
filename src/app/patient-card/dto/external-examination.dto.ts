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
        faceConfiguration: { type: 'int8', enum: Object.values(FaceConfiguration) },
        lymphNodes: { type: 'int8', enum: Object.values(LymphNodes) },
        temporomandibularJoint: { type: 'int8', enum: Object.values(TemporomandibularJoint) },
    }
};
