import { Controller, Get } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvQuery } from "../../common/decorators/ajv.decorators";
import { PractitionersCrudUseCases } from "../use-cases/practitioners.crud.use-cases";
import { GetPractitionersFilters, getPractitionersFiltersSchema } from "../dto/practitioner.dto";

@Controller("/practitioners")
export class PatientsController {
    constructor(
        private readonly practitionersCrudUseCases: PractitionersCrudUseCases
    ) {
    }

    @Get()
    async getPatients(
        @AjvQuery(getPractitionersFiltersSchema) filters: GetPractitionersFilters
    ) {
        const res = await this.practitionersCrudUseCases.findWithPagination(filters);
        return CustomResponse.fromResult(res);
    }
}
