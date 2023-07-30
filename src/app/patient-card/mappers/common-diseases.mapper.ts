import { Mapper } from "../../../core/mapper";
import { ICommonDiseasesSchema } from "../schemas/common-diseases.schema";
import { CommonDiseasesDto, CreateCommonDiseasesDto } from "../dto/common-diseases.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CommonDiseasesMapper extends Mapper<ICommonDiseasesSchema, CommonDiseasesDto, CreateCommonDiseasesDto> {
    async map(model: ICommonDiseasesSchema): Promise<CommonDiseasesDto> {
        return {
            cardiovascularSystem: model.cardiovascularSystem,
            nervousSystem: model.nervousSystem,
            endocrineSystem: model.endocrineSystem,
            digestiveSystem: model.digestiveSystem,
            respiratorySystem: model.respiratorySystem,
            allergicReactions: model.allergicReactions,
            continuousUseOfMedicines: model.continuousUseOfMedicines,
            harmfulFactors: model.harmfulFactors,
            pregnancyOrPostpartumPeriod: model.pregnancyOrPostpartumPeriod,
            infectiousDiseases: model.infectiousDiseases,
            other: model.other
        }
    }

    async mapToSchema(dto: Partial<CreateCommonDiseasesDto> | CreateCommonDiseasesDto): Promise<ICommonDiseasesSchema> {
        return {
            cardiovascularSystem: dto.cardiovascularSystem,
            nervousSystem: dto.nervousSystem,
            endocrineSystem: dto.endocrineSystem,
            digestiveSystem: dto.digestiveSystem,
            respiratorySystem: dto.respiratorySystem,
            allergicReactions: dto.allergicReactions,
            continuousUseOfMedicines: dto.continuousUseOfMedicines,
            harmfulFactors: dto.harmfulFactors,
            pregnancyOrPostpartumPeriod: dto.pregnancyOrPostpartumPeriod,
            infectiousDiseases: dto.infectiousDiseases,
            other: dto.other
        }
    }
}
