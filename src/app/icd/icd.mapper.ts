import { Mapper } from "../../core/mapper";
import { ICDSchema } from "./icd.schema";
import { CreateICDDto, ICDDto } from "./icd.dto";

export class ICDMapper extends Mapper<ICDSchema, ICDDto, CreateICDDto> {
    async map(model: ICDSchema): Promise<ICDDto> {
        return {
            _id: model._id.toString(),
            code: model.code,
            name: model.name
        }
    }

    async mapToSchema(dto: Partial<CreateICDDto> | CreateICDDto): Promise<ICDSchema> {
        return {
            code: dto.code,
            name: dto.name
        }
    }
}

export const icdMapper = new ICDMapper()