import { Schema } from "mongoose"

export const dentalConditionValue = [
    "0",
    "1",
    "3",
    "4",
    "7",
    "8",
    "A",
    "B",
    "D",
    "E"
]

type DentalFormula = {
    top: Array<string | null>,
    bottom: Array<string | null>
}

export const ohisValues = [
    "0",
    "1",
    "2",
    "3"
]

type OHIS = Array<[string, string]>

export const kpiValues = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5"
]

type KPI = [string]


export enum Bites {
    ORTHOGNATIC = 1,
    DISTAL,
    MESIAL,
    DEEP,
    OPEN,
    CROSS
}

export const bitesReadable = {
    [Bites.ORTHOGNATIC]: 'Ортогнатический',
    [Bites.DISTAL]: 'Дистальный',
    [Bites.MESIAL]: 'Мезиальный',
    [Bites.DEEP]: 'Глубокий',
    [Bites.OPEN]: 'Открытый',
    [Bites.CROSS]: 'Перекрестный',
}

type HardTissueConditions = {
    largeFillings: string | null
    abrasion: string | null
    colorChange: string | null
    shapeChange: string | null
    irops: string | null
    hyperemia: string | null
    recession: string | null
    toothAttachments: string | null
}

export type DentalStatusSchema = {
    dentalFormula: DentalFormula
    ohis: OHIS
    kpi: KPI
    kpu: Array<number>
    bite: Array<number>,
    hardTissueConditions: HardTissueConditions
    researchData: ResearchData
}

export type ResearchData = {
    notCarriedOut: boolean
    seeDiary: boolean
    noPathologicalChanges: string
}

const dentalFormulaSchema = new Schema<DentalFormula>({
    top: { type: [String], required: true },
    bottom: { type: [String], required: true }
}, { _id: false })

const hardTissueConditionsSchema = new Schema<HardTissueConditions>({
    largeFillings: { type: String, nullable: true, default: null },
    abrasion: { type: String, nullable: true, default: null },
    colorChange: { type: String, nullable: true, default: null },
    shapeChange: { type: String, nullable: true, default: null },
    irops: { type: String, nullable: true, default: null },
    hyperemia: { type: String, nullable: true, default: null },
    recession: { type: String, nullable: true, default: null },
    toothAttachments: { type: String, nullable: true, default: null },
}, { _id: false })

const researchDataSchema = new Schema<ResearchData>({
    notCarriedOut: { type: Boolean, required: true, default: false },
    seeDiary: { type: Boolean, default: false },
    noPathologicalChanges: { type: String, default: null }
}, { _id: false })

export const dentalStatusSchema = new Schema<DentalStatusSchema>({
    dentalFormula: { type: dentalFormulaSchema, required: true },
    ohis: { type: [[String]] },
    kpi: { type: [String] },
    kpu: { type: [Number] },
    bite: { type: [Number] },
    hardTissueConditions: { type: hardTissueConditionsSchema, required: true },
    researchData: { type: researchDataSchema, required: true },
}, { _id: false })
