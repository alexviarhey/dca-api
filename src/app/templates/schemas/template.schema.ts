import { Schema } from "mongoose"

export enum TemplateCode {
    TREATMENT = 1,
    LOCAL_STATUS,
    RESEARCH
}

export interface ITemlpateSchema {
    _id?: string
    icdId?: string
    serviceSubgroupsIds?: string[]
    code: TemplateCode
    name: string
    text: string
}

export const templateSchema = new Schema<ITemlpateSchema>({
    icdId: { type: String, required: false, default: null},
    serviceSubgroupsIds: { type: [String], required: false, default: []},
    code: { type: Number, required: true },
    name: {type: String, required: true},
    text: {type: String, required: true},
})

export const TEMPLATES_COLLECTION = 'templates'