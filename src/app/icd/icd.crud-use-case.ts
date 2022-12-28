import { CrudUseCases } from "../../core/crud.use-cases";
import { ICD_COLLECTION, ICDSchema } from "./icd.schema";
import { CreateICDDto, ICDDto } from "./icd.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { icdMapper } from "./icd.mapper";


export class ICDCrudUseCase extends CrudUseCases<ICDSchema, CreateICDDto, ICDDto> {
    constructor(
            @InjectModel(ICD_COLLECTION)
            private readonly icdModel: Model<ICDSchema>
    ) {
        super(
                icdModel,
                icdMapper,
                'МКБ-пункт'
        );
    }
}