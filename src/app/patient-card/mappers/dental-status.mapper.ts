import { Mapper } from "../../../core/mapper";
import { Injectable } from "@nestjs/common";
import { DentalStatusSchema } from "../schemas/dental-status.schema";
import { DentalStatusDto } from "../dto/dental-status.dto";

@Injectable()
export class DentalStatusMapper extends Mapper<DentalStatusSchema, DentalStatusDto> {
    async map(model: DentalStatusSchema): Promise<DentalStatusDto> {
        return {
            dentalFormula: model.dentalFormula,
            ohis: model.ohis,
            kpi: model.kpi,
            kpu: model.kpu,
            bite: model.bite,
            hardTissueConditions: model.hardTissueConditions,
            researchData: model.researchData
        }
    }

    async mapToSchema(dto: DentalStatusDto): Promise<DentalStatusSchema> {
        return {
            dentalFormula: dto.dentalFormula,
            ohis: dto.ohis,
            kpi: dto.kpi,
            kpu: dto.kpu,
            bite: dto.bite,
            hardTissueConditions: dto.hardTissueConditions,
            researchData: dto.researchData
        }
    }
}
