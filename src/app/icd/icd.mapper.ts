import { Mapper } from "../../core/mapper";
import { ICDSchema } from "./icd.schema";
import { CreateICDDto, ICDDto } from "./icd.dto";

export class ICDMapper extends Mapper<ICDSchema, ICDDto, CreateICDDto> {
    map(model: ICDSchema): ICDDto {
        return {
            _id: model._id.toString(),
            code: model.code,
            name: model.name
        }
    }

    mapToSchema(dto: Partial<CreateICDDto> | CreateICDDto): ICDSchema {
        return {
            code: dto.code,
            name: dto.name
        }
    }
}

export const icdMapper = new ICDMapper()