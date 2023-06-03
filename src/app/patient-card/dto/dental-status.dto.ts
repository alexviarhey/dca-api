import { Bite, DentalFormula, HardTissueConditions, KPI, KPU, OHIS, ResearchData } from "../schemas/dental-status.schema"

export type DentalStatusDto = {
    dentalFormula: DentalFormula
    ohis: OHIS
    kpi: KPI
    kpu: KPU
    bite: Bite
    hardTissueConditions: HardTissueConditions
    researchData: ResearchData
}

export const dentalStatusAjvSchema = {
    type: "object",
    additionalProperties: false,
    allRequired: true,
    properties: {
        ohis: { type: 'array', nullable: false, items: { type: "array", items: { anyOf: [{ type: "number" }, { type: "null" }] } } },
        kpi: { type: 'array', nullable: false, items: { anyOf: [{ type: "number" }, { type: "null" }]}},
        kpu: { type: 'array', nullable: false, items: [{ type: "number" }, { type: "null" }] },
        bite: { type: 'array', nullable: false, items: { type: "number" } },
        dentalFormula: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                top: {
                    type: 'array',
                    nullable: false,
                    items: [
                        { type: "string" },
                        { type: "null" }
                    ],
                    minItems: DentalFormula.TEETH_IN_THE_JAW,
                    additionalItems: false
                },
                bottom: {
                    type: 'array',
                    nullable: false,
                    items: [
                        { type: "string" },
                        { type: "null" }
                    ],
                    minItems: DentalFormula.TEETH_IN_THE_JAW,
                    additionalItems: false
                },
            }
        },
        hardTissueConditions: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                largeFillings: { type: 'string', nullable: true },
                abrasion: { type: 'string', nullable: true },
                colorChange: { type: 'string', nullable: true },
                shapeChange: { type: 'string', nullable: true },
                irops: { type: 'string', nullable: true },
                hyperemia: { type: 'string', nullable: true },
                recession: { type: 'string', nullable: true },
                toothAttachments: { type: 'string', nullable: true },
            }
        },
        researchData: {
            type: "object",
            additionalProperties: false,
            allRequired: true,
            nullable: false,
            properties: {
                notCarriedOut: { type: 'boolean', nullable: false },
                seeDiary: { type: 'boolean', nullable: false },
                noPathologicalChanges: { type: 'string', nullable: true },
            }
        },
    }
}
