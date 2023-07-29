import { Injectable } from "@nestjs/common"
import { Mapper } from "../../../core/mapper"
import { VisitSchema } from "../schemas/visit.schema"
import { CreateVisitDto, ShortVisitDto, VisitDto } from "../dto/visit.dto"
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
            diagnosis: model.diagnosis,
        }
    }

    async mapToSchema(dto: Partial<CreateVisitDto>): Promise<VisitSchema> {

        const icdIdToothMap = new Map(dto.diagnosis.map(d => [d.icdId, d.tooth]))

        const icds = await this.icdModel.find({
            _id: {$in: icdIdToothMap.keys()}
        })

        const diagnosis = icds.map(i => ({tooth: icdIdToothMap.get(i._id.toString()), icdName: i.name, icdCode: i.code}))

        return {
            date: new Date(dto.date),
            complains: dto.complains,
            diagnosis,
            localStatus: dto.localStatus,
            treatment: dto.treatment,
            other: dto.other
        }
    }
}
