import { Schema } from "mongoose"
import { VisitDiagnosis, visitDiagnosisSchema } from "./visit.schema"

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

export class DentalFormula {
    public static TEETH_IN_THE_JAW = 16

    constructor(
        public top: Array<string | null>,
        public bottom: Array<string | null>
    ) { }

    public static default(): DentalFormula {
        return new DentalFormula(
            this.defaultForJaw(),
            this.defaultForJaw(),
        )
    }

    private static defaultForJaw(): Array<string | null> {
        return Array(this.TEETH_IN_THE_JAW).fill(null)
    }
}

export type OHIS = Array<[number, number] | null>
export type KPI = Array<number | null>
export type KPU = Array<number | null>

export class DentalIndexes {
    public static defaultOhis(): OHIS {
        return Array(6).fill(null)
    }

    public static defaultKpi(): KPI {
        return Array(6).fill(null)
    }

    public static defaultKpu(): KPU {
        return Array(3).fill(null)
    }
}

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

export type Bite = Array<number>

export type HardTissueConditions = {
    colorChange: string | null
    shapeChange: string | null
    surfaceChange: string | null
    largeFillings: string | null
}

export const hardTissueConditionsReadable: Record<keyof HardTissueConditions, string> = {
    colorChange: 'изменение цвета',
    shapeChange: 'изменение формы',
    surfaceChange: 'измени поверхности',
    largeFillings: 'обширные плломбы зуба (-ов)'
}

export const periodontalConditionReadable: Record<keyof PeriodontalCondition, string> = {
    bleeding: 'кровоточивость',
    dentogingivalAttachmentDisorder: 'нарушение зубодесневого прикрепления',
    recession: 'рецессия',
    presenceOfPeriodontalPocket: 'наличие периодонтального кармана',
    toothMobility: 'подвижность зубов'
}

export const conditionOfTheOralMucosaReadable: Record<keyof ConditionOfTheOralMucosa, string> = {
    hyperemic: 'гиперимированная',
    edematous: 'отечная',
    hyperplasia: 'гиперплазия',
    colorIsBroken: 'нарушена цветность (язвы, афты, эрозии)',
    other: 'другое'
}

export type PeriodontalCondition = {
    bleeding: string | null
    dentogingivalAttachmentDisorder: string | null
    recession: string | null
    presenceOfPeriodontalPocket: string | null
    toothMobility: string | null
}

export type ConditionOfTheOralMucosa = {
    hyperemic: boolean
    edematous: boolean
    hyperplasia: boolean
    colorIsBroken: boolean
    other: string
}

export type DentalStatusSchema = {
    dentalFormula: DentalFormula
    ohis: OHIS
    kpi: KPI
    kpu: KPU
    bite: Bite | null
    hardTissueConditions: HardTissueConditions
    periodontalCondition: PeriodontalCondition
    conditionOfTheOralMucosa: ConditionOfTheOralMucosa
    researchData: string | null
    provisionalDiagnosis: VisitDiagnosis[] | null
}

const dentalFormulaSchema = new Schema<DentalFormula>({
    top: { type: [String], required: true },
    bottom: { type: [String], required: true }
}, { _id: false })


const hardTissueConditionsSchema = new Schema<HardTissueConditions>({
    colorChange: { type: String, nullable: true, default: null },
    shapeChange: { type: String, nullable: true, default: null },
    surfaceChange: { type: String, nullable: true, default: null },
    largeFillings: { type: String, nullable: true, default: null },
}, { _id: false })

const periodontalCondition = new Schema<PeriodontalCondition>({
    bleeding: { type: String, nullable: true, default: null },
    dentogingivalAttachmentDisorder: { type: String, nullable: true, default: null },
    recession: { type: String, nullable: true, default: null },
    presenceOfPeriodontalPocket: { type: String, nullable: true, default: null },
    toothMobility: { type: String, nullable: true, default: null }
}, { _id: false })

const conditionOfTheOralMucosa = new Schema<ConditionOfTheOralMucosa>({
    hyperemic: { type: Boolean, default: true },
    edematous: { type: Boolean, default: true },
    hyperplasia: { type: Boolean, default: true },
    colorIsBroken: { type: Boolean, default: true },
    other: { type: String, nullable: true, default: null },
}, { _id: false })

export const dentalStatusSchema = new Schema<DentalStatusSchema>({
    dentalFormula: { type: dentalFormulaSchema, required: true },
    ohis: { type: Schema.Types.Mixed, required: true },
    kpi: { type: Schema.Types.Mixed, required: true },
    kpu: { type: [Number] },
    bite: { type: [Number], nullable: true, default: null },
    hardTissueConditions: { type: hardTissueConditionsSchema, required: true },
    periodontalCondition: { type: periodontalCondition, required: true },
    conditionOfTheOralMucosa: { type: conditionOfTheOralMucosa, required: true },
    researchData: { type: String, nullable: true, default: null },
    provisionalDiagnosis: { type: [visitDiagnosisSchema], nullable: true, default: null }
}, { _id: false })
