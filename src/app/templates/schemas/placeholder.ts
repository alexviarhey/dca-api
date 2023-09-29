import { ObjectExpression, Schema } from "mongoose";


export enum TemplatePlaceholdersTypes {
    LENGTH = 1,
    HEIGHT,
    WIDTH,
    VOLUME,
    TOOTH,
    BUSHAN_ERASURE_STAGE,
    DEPTH_OF_LESION,
    LESION_PLANE,
    EXTENDS_DEFEAT,
    DENTINE_SENSITIVITY,
    TOOTH_SURFACE,
    ROOTS_CANALS
}

export const templatePlaceholdersMap: Map<number, string> = new Map([
    [TemplatePlaceholdersTypes.LENGTH, "{{length}}"],
    [TemplatePlaceholdersTypes.HEIGHT, "{{height}}"],
    [TemplatePlaceholdersTypes.WIDTH, "{{width}}"],
    [TemplatePlaceholdersTypes.VOLUME, "{{volume}}"],
    [TemplatePlaceholdersTypes.TOOTH, "{{tooth}}"],
    [TemplatePlaceholdersTypes.BUSHAN_ERASURE_STAGE, "{{bushan_erasure_stage}}"],
    [TemplatePlaceholdersTypes.DEPTH_OF_LESION, "{{depth_of_lesion}}"],
    [TemplatePlaceholdersTypes.LESION_PLANE, "{{lesion_plane}}"],
    [TemplatePlaceholdersTypes.EXTENDS_DEFEAT, "{{extends_defeat}}"],
    [TemplatePlaceholdersTypes.DENTINE_SENSITIVITY, "{{dentine_sensitivity}}"],
    [TemplatePlaceholdersTypes.TOOTH_SURFACE, "{{tooth_surface}}"],
    [TemplatePlaceholdersTypes.ROOTS_CANALS, "{{roots_canals}}"],
])

export const templatePlaceholdersMapReadable = {
    [TemplatePlaceholdersTypes.LENGTH]: { title: 'Длина', value: "{{length}}" },
    [TemplatePlaceholdersTypes.HEIGHT]: { title: 'Высота', value: "{{height}}" },
    [TemplatePlaceholdersTypes.WIDTH]: { title: 'Ширина', value: "{{width}}" },
    [TemplatePlaceholdersTypes.VOLUME]: { title: 'Объем', value: "{{volume}}" },
    [TemplatePlaceholdersTypes.TOOTH]: { title: 'Зуб', value: "{{tooth}}" },
    [TemplatePlaceholdersTypes.BUSHAN_ERASURE_STAGE]: { title: 'Убыль твердых тканей зубов по Бушану (стадии развития)', value: "{{bushan_erasure_stage}}" },
    [TemplatePlaceholdersTypes.DEPTH_OF_LESION]: { title: 'Глубина убыли твердых тканей зубов', value: "{{depth_of_lesion}}" },
    [TemplatePlaceholdersTypes.LESION_PLANE]: { title: 'Плоскость убыли твердых тканей зубов', value: "{{lesion_plane}}" },
    [TemplatePlaceholdersTypes.EXTENDS_DEFEAT]: { title: 'Протяженность убыли твердых тканей зубов', value: "{{extends_defeat}}" },
    [TemplatePlaceholdersTypes.DENTINE_SENSITIVITY]: { title: 'Чувствительность дентина', value: "{{dentine_sensitivity}}" },
    [TemplatePlaceholdersTypes.TOOTH_SURFACE]: { title: 'Поверхность зуба', value: "{{tooth_surface}}" },
    [TemplatePlaceholdersTypes.ROOTS_CANALS]: { title: 'Количество каналов', value: "{{roots_canals}}" }
}

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
