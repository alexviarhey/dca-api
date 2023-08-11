import { Bite, ConditionOfTheOralMucosa, DentalFormula, HardTissueConditions, KPI, KPU, OHIS, PeriodontalCondition } from "../schemas/dental-status.schema"

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
    provisionalDiagnosis: string | null
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
                colorChange: { type: 'string', nullable: false },
                shapeChange: { type: 'string', nullable: false },
                surfaceChange: { type: 'string', nullable: false },
                largeFillings: { type: 'string', nullable: false },
            }
        },
        periodontalCondition: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                bleeding: { type: 'string', nullable: false },
                dentogingivalAttachmentDisorder: { type: 'string', nullable: false },
                recession: { type: 'string', nullable: false },
                presenceOfPeriodontalPocket: { type: 'string', nullable: false },
                toothMobility: { type: 'string', nullable: false },
            }
        },
        conditionOfTheOralMucosa: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                hyperemic: { type: 'string', nullable: false },
                edematous: { type: 'string', nullable: false },
                hyperplasia: { type: 'string', nullable: false },
                colorIsBroken: { type: 'string', nullable: true},
            }
        },
        researchData: { type: 'string', nullable: true },
        provisionalDiagnosis: { type: 'string', nullable: true }
    }
}
