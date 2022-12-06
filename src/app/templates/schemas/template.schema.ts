import { Schema } from "mongoose"

export enum TemplateCode {
    TREATMENT = 1,
    LOCAL_STATUS
}

export interface ITemlpateSchema {
    _id?: string
    icdId?: string
    code: TemplateCode
    name: string
    text: string
}

export const templateSchema = new Schema<ITemlpateSchema>({
    icdId: { type: String, required: false, default: null},
    code: { type: Number, required: true },
    name: {type: String, required: true},
    text: {type: String, required: true},
})

export const TEMPLATES_COLLECTION = 'templates'