import { FaceConfiguration, FaceConfigurationReadable, LymphNodes, LymphNodesReadable, TemporomandibularJoint, TemporomandibularJointReadable } from "../schemas/externalExamination";

export type ExternalExaminationDto = {
    complaints: string | null
    stateOfHealth: string | null
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
        stateOfHealth: { type: 'string', nullable: false },
        conditionOfTheSkinRedBorder: { type: 'string', nullable: true },
        faceConfiguration: {
            type: 'array',
            items: { enum: Object.keys(FaceConfigurationReadable).map(k => +k) }
        },
        lymphNodes: {
            type: 'array',
            items: {
                enum: Object.keys(LymphNodesReadable).map(k => +k)
            }
        },
        temporomandibularJoint: {
            type: 'array',
            items: {
                enum: Object.keys(TemporomandibularJointReadable).map(k => +k)
            }
        }
    }
};
