import { Injectable } from "@nestjs/common"
import { Mapper } from "../../../core/mapper"
import { VisitDiagnosis, VisitSchema } from "../schemas/visit.schema"
import { CreateVisitDto, ShortVisitDto, VisitDiagnosisDto, VisitDto } from "../dto/visit.dto"
import { InjectModel } from "@nestjs/mongoose"
import { ICDSchema, ICD_COLLECTION } from "../../icd/icd.schema"
import { Model } from "mongoose"


@Injectable()
export class VisitMapper extends Mapper<VisitSchema, VisitDto, CreateVisitDto> {
    constructor(
        @InjectModel(ICD_COLLECTION)
        private readonly icdModel: Model<ICDSchema>
    ) {
        super()
    }

    async map(model: VisitSchema): Promise<VisitDto> {

        const icds = this.icdModel.find({
            _id: { $in: model.diagnosis.map(d => d.icdId) }
        })

        return {
            _id: model._id,
            date: model.date,
            complains: model.complains,
            diagnosis: model.diagnosis,
            localStatus: model.localStatus,
            treatment: model.treatment,
            other: model.other
        }
    }

    shortMap(model: VisitSchema): ShortVisitDto {
        return {
            _id: model._id,
            date: model.date,
            diagnosis: model.diagnosis
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
