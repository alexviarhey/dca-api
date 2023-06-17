import { Schema } from "mongoose"

export type VisitDiagnosis = {
    tooth: number,
    icdName: string
    icdCode: string
}

export type VisitSchema = {
    _id?: string
    date: Date
    complains: string
    diagnosis: Array<VisitDiagnosis>
    localStatus: string
    treatment: string
    other: string
}

const visitDiagnosisSchema = new Schema({
    tooth: { type: Number, nullable: false },
    icdIds: { type: [String], nullable: false }
}, { _id: false })

export const visitSchema = new Schema({
    date: { type: Date, nullable: false },
    complains: { type: String, nullable: false },
    diagnosis: { type: [visitDiagnosisSchema] },
    localStatus: { type: String, nullable: false },
    treatment: { type: String, nullable: false },
    other: { type: String, nullable: true, default: null }
})
