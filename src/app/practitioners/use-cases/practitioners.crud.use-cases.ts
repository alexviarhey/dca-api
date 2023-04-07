import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CrudUseCases } from "../../../core/crud.use-cases";
import { FilterQuery, Model, SaveOptions } from "mongoose";
import { CreatePractitionerDto, PractitionerDto } from "../dto/practitioner.dto";
import { PRACTITIONERS_COLLECTION, PractitionerSchema } from "../schemas/practitioner.schema";
import { practitionersMapper } from "../mappers/practitioner.mapper";
import { Result } from "../../../core/result";

@Injectable()
export class PractitionersCrudUseCases extends CrudUseCases<PractitionerSchema,
    CreatePractitionerDto,
    PractitionerDto> {
    constructor(
        @InjectModel(PRACTITIONERS_COLLECTION)
        practitionerModel: Model<PractitionerSchema>,
    ) {
        super(
            practitionerModel,
            practitionersMapper,
            "Работник"
        );
    }
}
