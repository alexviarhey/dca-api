import { Schema } from "mongoose";


export enum TemplatePlaceholdersTypes {
    LENGTH = 1,
    HEIGHT,
    WIDTH,
    VOLUME,
    TOOTH
}

export const templatePlaceholdersMap: Map<number, string> = new Map([
    [TemplatePlaceholdersTypes.LENGTH, "{{length}}"],
    [TemplatePlaceholdersTypes.HEIGHT, "{{height}}"],
    [TemplatePlaceholdersTypes.WIDTH, "{{width}}"],
    [TemplatePlaceholdersTypes.VOLUME, "{{volume}}"],
    [TemplatePlaceholdersTypes.TOOTH, "{{tooth}}"],
]);

export interface ITemplatePlaceholder {
    _id?: string,
    name: string,
    placeholder: string
}

export const templatePlaceholderSchema = new Schema<ITemplatePlaceholder>({
    name: { type: String, nullable: false },
    placeholder: { type: String, nullable: false }
});

export const TEMPLATES_PLACEHOLDERS_COLLECTION = "templates_placeholders";