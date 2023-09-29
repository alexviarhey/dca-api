import { Bite, ConditionOfTheOralMucosa, DentalFormula, HardTissueConditions, KPI, KPU, OHIS, PeriodontalCondition } from "../schemas/dental-status.schema"
import { CreateVisitDiagnosisDto, VisitDiagnosisDto } from "./visit.dto"

export type DentalStatusDto = {
    dentalFormula: DentalFormula
    ohis: OHIS
    kpi: KPI
    kpu: KPU
    bite: Bite
    hardTissueConditions: HardTissueConditions
    periodontalCondition: PeriodontalCondition
    conditionOfTheOralMucosa: ConditionOfTheOralMucosa
    researchData: string | null
    provisionalDiagnosis: CreateVisitDiagnosisDto[]
}

export const dentalStatusAjvSchema = {
    type: "object",
    additionalProperties: false,
    allRequired: true,
    properties: {
        ohis: {
            type: 'array',
            nullable: false,
            items: {
                type: "array",
                items: { anyOf: [{ type: "number" }, { type: "null" }] }
            }
        },
        kpi: {
            type: 'array',
            nullable: false,
            items: { anyOf: [{ type: "number" }, { type: "null" }] }
        },
        kpu: {
            type: 'array',
            nullable: false,
            items: { anyOf: [{ type: "number" }, { type: "null" }] }
        },
        bite: {
            type: 'array',
            nullable: false,
            items: { type: "number" }
        },
        dentalFormula: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                top: {
                    type: 'array',
                    nullable: false,
                    items: { anyOf: [{ type: "number" }, { type: "null" }] },
                    minItems: DentalFormula.TEETH_IN_THE_JAW,
                },
                bottom: {
                    type: 'array',
                    nullable: false,
                    items: { anyOf: [{ type: "number" }, { type: "null" }] },
                    minItems: DentalFormula.TEETH_IN_THE_JAW,
                },
            }
        },
        hardTissueConditions: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                colorChange: { type: 'string', nullable: true },
                shapeChange: { type: 'string', nullable: true },
                surfaceChange: { type: 'string', nullable: true },
                largeFillings: { type: 'string', nullable: true },
            }
        },
        periodontalCondition: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                bleeding: { type: 'string', nullable: true},
                dentogingivalAttachmentDisorder: { type: 'string', nullable: true },
                recession: { type: 'string', nullable: true },
                presenceOfPeriodontalPocket: { type: 'string', nullable: true },
                toothMobility: { type: 'string', nullable: true },
            }
        },
        conditionOfTheOralMucosa: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                hyperemic: { type: 'boolean', nullable: false },
                edematous: { type: 'boolean', nullable: false },
                hyperplasia: { type: 'boolean', nullable: false },
                colorIsBroken: { type: 'boolean', nullable: false },
                other: { type: 'string', nullable: true },
            }
        },
        researchData: { type: 'string', nullable: true },
        provisionalDiagnosis: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                allRequired: true,
                properties: {
                    tooth: { type: 'number', nullable: true },
                    icdId: { type: 'string' },
                }
            }
        },
    }
}
