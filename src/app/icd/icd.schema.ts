import { Schema } from "mongoose";


export interface ICDSchema {
    _id?: string
    code: string
    name: string
}

export const icdSchema = new Schema({
    code: {type: String, required: true, unique: false},
    name: {type: String, required: true}
})

export const ICD_COLLECTION = 'icd'