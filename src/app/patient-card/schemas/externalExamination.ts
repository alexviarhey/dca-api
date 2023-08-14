import { Schema } from "mongoose";

export enum FaceConfiguration {
    NOT_CHANGED = 1,
    ASYMMETRY,
    NASOLABIAL_CHIN_FOLDS_NOT_EXPRESSED,
    NASOLABIAL_CHIN_FOLDS_EXPRESSED,
    REDUCED_HEIGHT_OF_THE_LOWER_THIRD_OF_FACE
}

export const FaceConfigurationReadable = {
    [FaceConfiguration.NOT_CHANGED]: "не изменена",
    [FaceConfiguration.ASYMMETRY]: "ассиметрия",
    [FaceConfiguration.NASOLABIAL_CHIN_FOLDS_NOT_EXPRESSED]: "не выражены носогубные, подбородочные складки",
    [FaceConfiguration.NASOLABIAL_CHIN_FOLDS_EXPRESSED]: "выражены носогубные, подбородочные складки",
    [FaceConfiguration.REDUCED_HEIGHT_OF_THE_LOWER_THIRD_OF_FACE]: "снижена высота нижней трети лица"
};

export enum LymphNodes {
    NOT_ENLARGED = 1,
    ENLARGED,
    ELASTIC,
    MOBILE,
    PAINLESS,
    PAINFUL,
    DENSE,
    SWOLLEN,
}

export const LymphNodesReadable = {
    [LymphNodes.NOT_ENLARGED]: "не увеличены",
    [LymphNodes.ENLARGED]: "увеличены",
    [LymphNodes.ELASTIC]: "эластичные",
    [LymphNodes.MOBILE]: "подвижные",
    [LymphNodes.PAINLESS]: "безболезненные",
    [LymphNodes.PAINFUL]: "болезненные",
    [LymphNodes.DENSE]: "плотные",
    [LymphNodes.SWOLLEN]: "спаяные",
}

export enum TemporomandibularJoint {
    MOVEMENT_IN_FULL = 1,
    MOVEMENT_ARE_DIFFICULT,
    PAINLESS,
    PAINFUL,
    LIMITED_MOUTH_OPENING,
    S_OFFSET_RIGHT,
    S_OFFSET_LEFT,
    WITH_CLICK_OR_CRUNCH
}

export const TemporomandibularJointReadable = {
    [TemporomandibularJoint.MOVEMENT_IN_FULL]: "движения в полном объеме",
    [TemporomandibularJoint.MOVEMENT_ARE_DIFFICULT]: "движения затруднены",
    [TemporomandibularJoint.PAINLESS]: "безболезненные",
    [TemporomandibularJoint.PAINFUL]: "болезненные",
    [TemporomandibularJoint.LIMITED_MOUTH_OPENING]: "открывание рта ограничено",
    [TemporomandibularJoint.S_OFFSET_RIGHT]: "с S-образным смещением право",
    [TemporomandibularJoint.S_OFFSET_LEFT]: "с S-образным смещением влево",
    [TemporomandibularJoint.WITH_CLICK_OR_CRUNCH]: "со щелчком/хрустом",
}

export interface IExternalExaminationSchema {
    complaints: string | null
    faceConfiguration: FaceConfiguration[],
    conditionOfTheSkinRedBorder: string | null
    lymphNodes: LymphNodes[]
    temporomandibularJoint: TemporomandibularJoint[]
}

export const externalExaminationSchema = new Schema<IExternalExaminationSchema>({
    complaints: { type: String, nullable: true, default: null },
    faceConfiguration: { type: [Number], nullable: false },
    conditionOfTheSkinRedBorder: { type: String, nullable: true, default: null },
    lymphNodes: { type: [Number], nullable: false },
    temporomandibularJoint: { type: [Number], nullable: false }
}, {_id: false})
