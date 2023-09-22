import { Schema } from "mongoose"

export enum TemplateType {
    TREATMENT = 1,
    LOCAL_STATUS,
    RESEARCH,
    COMPLAINS,
    RECOMMENDATIONS
}

export interface ITemplateSchema {
    _id?: string
    icdIds?: string[]
    serviceSubgroupsIds?: string[]
    type: TemplateType
    name: string
    description: string,
}

export const templateSchema = new Schema<ITemplateSchema>({
    icdIds: { type: [String], required: false, default: []},
    serviceSubgroupsIds: { type: [String], required: false, default: []},
    type: { type: Number, required: true },
    name: {type: String, required: true},
    description: {type: String, required: true},
})

export const TEMPLATES_COLLECTION = 'templates'
