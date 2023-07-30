import { Mapper } from "../../../core/mapper";
import { Injectable } from "@nestjs/common";
import { IExternalExaminationSchema } from "../schemas/externalExamination";
import { ExternalExaminationDto } from "../dto/external-examination.dto";

@Injectable()
export class ExternalExaminationMapper extends Mapper<IExternalExaminationSchema, ExternalExaminationDto, ExternalExaminationDto> {
    async map(model: IExternalExaminationSchema): Promise<ExternalExaminationDto> {
        return {
            complaints: model.complaints,
            stateOfHealth: model.stateOfHealth,
            conditionOfTheSkinRedBorder: model.conditionOfTheSkinRedBorder,
            faceConfiguration: model.faceConfiguration,
            lymphNodes: model.lymphNodes,
            temporomandibularJoint: model.temporomandibularJoint
        }
    }

    async mapToSchema(dto: Partial<ExternalExaminationDto>): Promise<IExternalExaminationSchema> {
        return {
            complaints: dto.complaints,
            stateOfHealth: dto.stateOfHealth,
            conditionOfTheSkinRedBorder: dto.conditionOfTheSkinRedBorder,
            faceConfiguration: dto.faceConfiguration,
            lymphNodes: dto.lymphNodes,
            temporomandibularJoint: dto.temporomandibularJoint
        }
    }
}
