import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CrudUseCases } from "../../../core/crud.use-cases";
import { FilterQuery, Model } from "mongoose";
import { CreatePractitionerDto, GetPractitionersFilters, PractitionerDto } from "../dto/practitioner.dto";
import { PRACTITIONERS_COLLECTION, PractitionerSchema } from "../schemas/practitioner.schema";
import { PractitionersMapper } from "../mappers/practitioner.mapper";
import { GetPatientsFilters } from "../../patients/dto/get-patients-filters";
import { Result } from "../../../core/result";
import { Paginated, Pagination } from "../../../core/paginated";
import { ContactPointSystem } from "../../common/schemas/contact-point.schema";

@Injectable()
export class PractitionersCrudUseCases extends CrudUseCases<PractitionerSchema,
    CreatePractitionerDto,
    PractitionerDto> {
    constructor(
        @InjectModel(PRACTITIONERS_COLLECTION)
        practitionerModel: Model<PractitionerSchema>,
        practitionersMapper: PractitionersMapper
    ) {
        super(
            practitionerModel,
            practitionersMapper,
            "Сотрудник"
        );
    }

    async findWithPagination(filters: GetPractitionersFilters): Promise<Result<Paginated<PractitionerDto>>> {
        const paginated = Pagination.new({ page: filters.page, size: filters.size });

        const filterQuery: FilterQuery<PractitionerSchema> = {};

        if (filters.active !== undefined) {
            filterQuery.active = filters.active
        } else {
            filterQuery.active = true
        }

        if (filters.name) filterQuery["name.text"] = { $regex: filters.name };

        if (filters.address) filterQuery["address.text"] = { $regex: filters.address };

        if (filters.phone) {
            filterQuery.telecom = {
                $elemMatch: {
                    use: ContactPointSystem.PHONE,
                    value: { $regex: filters.phone }
                }
            };
        }

        return super.findWithPagination(filterQuery, paginated);
    }
}
