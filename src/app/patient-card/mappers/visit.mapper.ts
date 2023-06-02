import { Injectable } from "@nestjs/common"
import { Mapper } from "../../../core/mapper"
import { VisitSchema } from "../schemas/visit.schema"
import { CreateVisitDto, VisitDiagnosisDto, VisitDto } from "../dto/visit.dto"
import { InjectModel } from "@nestjs/mongoose"
import { ICDSchema, ICD_COLLECTION } from "../../icd/icd.schema"
import { Model } from "mongoose"
import { icdMapper } from "../../icd/icd.mapper"

@Injectable()
export class VisitMapper extends Mapper<VisitSchema, VisitDto, CreateVisitDto> {
    constructor(
        @InjectModel(ICD_COLLECTION)
        private readonly icdModel: Model<ICDSchema>
    ) {
        super()
    }

    async map(model: VisitSchema): Promise<VisitDto> {

        const diagnosisDto: Array<VisitDiagnosisDto> = []

        for (const d of model.diagnosis) {
            const icd = await this.icdModel.findById(d.icdId)

            if (!icd) throw new Error(`Icd with id ${d.icdId} not found!`)

            diagnosisDto.push({
                tooth: d.tooth,
                icdDto: await icdMapper.map(icd)
            })
        }

        return {
            date: model.date,
            complains: model.complains,
            diagnosis: diagnosisDto,
            localStatus: model.localStatus,
            treatment: model.treatment,
            other: model.other
        }
    }

    async mapToSchema(dto: Partial<CreateVisitDto>): Promise<VisitSchema> {
        return {
            date: new Date(dto.date),
            complains: dto.complains,
            diagnosis: dto.diagnosis,
            localStatus: dto.localStatus,
            treatment: dto.treatment,
            other: dto.other
        }
    }
}
