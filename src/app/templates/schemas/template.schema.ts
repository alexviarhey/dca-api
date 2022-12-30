import { Schema } from "mongoose"
import { TemplatePlaceholdersTypes } from "./placeholder";

export enum TemplateType {
    TREATMENT = 1,
    LOCAL_STATUS,
    RESEARCH
}

export interface ITemplateSchema {
    _id?: string
    icdIds?: string[]
    serviceSubgroupsIds?: string[]
    type: TemplateType
    name: string
    description: string,
    placeholders: TemplatePlaceholdersTypes[]
}

export const templateSchema = new Schema<ITemplateSchema>({
    icdIds: { type: [String], required: false, default: []},
    serviceSubgroupsIds: { type: [String], required: false, default: []},
    type: { type: Number, required: true },
    name: {type: String, required: true},
    description: {type: String, required: true},
    placeholders: {type: [Number], required: false, default: null},
})

export const TEMPLATES_COLLECTION = 'templates'