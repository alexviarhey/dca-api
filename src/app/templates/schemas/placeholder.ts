import { Schema } from "mongoose";

export interface ITemplatePlaceholder {
    _id?: string,
    name: string,
    placeholder: string
}

export const templatePlaceholderSchema = new Schema<ITemplatePlaceholder>({
    name: { type: String, nullable: false },
    placeholder: { type: String, nullable: false },
})

export const TEMPLATES_PLACEHOLDERS_COLLECTION = 'templates_placeholders'