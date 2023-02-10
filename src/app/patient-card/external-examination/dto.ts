import { FaceConfiguration, LymphNodes} from "../schemas/externalExamination";


export type ExternalExaminationDto = {
    complaints: string | null
    faceConfiguration: FaceConfiguration[]
    conditionOfTheSkinRedBorder: string | null
    lymphNodes: LymphNodes[]
}




