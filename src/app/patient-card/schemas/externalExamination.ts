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

interface IHardTissuesOfTeethAndPeriodontiumCondtitions {
    extensiveFillings: number[] | null
    abrasion: number[] | null
    colorChange: number[] | null
    shapeChange: number[] | null
    IROPZ: number[] | null
    hyperemia: number[] | null
    recession: number[] | null
    dentogingivalAttachmentDisorder: number[] | null
}

export enum XrayAndOtherResearchData {
    NOT_CARRIED_OUT = 1,
    SEE_DIARY
}

export const XrayAndOtherResearchDataReadable = {
    [XrayAndOtherResearchData.NOT_CARRIED_OUT]: 'не проводились',
    [XrayAndOtherResearchData.SEE_DIARY]: 'см. дневник'
}

export interface IExternalExamination {
    //Обсудить это поле
    complaints: string
    faceConfiguration: FaceConfiguration[],
    conditionOfTheSkinRedBorder: string | null
    lymphNodes: LymphNodes[]
    temporomandibularJoint: TemporomandibularJoint[]
    //уточнить про прикус
    bite: string
    hardTissuesOfTeethAndPeriodontiumCondtitions: IHardTissuesOfTeethAndPeriodontiumCondtitions
    xrayAndOtherResearchData: XrayAndOtherResearchData
}