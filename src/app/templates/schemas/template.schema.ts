import { Schema } from "mongoose"

export enum TemplateType {
    TREATMENT = 1,
    LOCAL_STATUS,
    RESEARCH
}

export interface ITemplateSchema {
    _id?: string
    icdId?: string
    serviceSubgroupsIds?: string[]
    type: TemplateType
    name: string
    description: string
}

export const templateSchema = new Schema<ITemplateSchema>({
    icdId: { type: String, required: false, default: null},
    serviceSubgroupsIds: { type: [String], required: false, default: []},
    type: { type: Number, required: true },
    name: {type: String, required: true},
    description: {type: String, required: true},
})

export const TEMPLATES_COLLECTION = 'templates'