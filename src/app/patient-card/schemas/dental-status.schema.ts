import { Schema } from "mongoose"


export type DentalStatusSchema = {
    dentalFormula: DentalFormula
}


type DentalFormula = {
    top: Array<number | null>,
    bottom: Array<number | null>
}

const dentalFormulaSchema = new Schema<DentalFormula>({
}, { _id: false })
