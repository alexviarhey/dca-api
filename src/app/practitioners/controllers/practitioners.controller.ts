import { Controller, Get } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvQuery } from "../../common/decorators/ajv.decorators";
import { PractitionersCrudUseCases } from "../use-cases/practitioners.crud.use-cases";
import { GetPractitionersFilters, getPractitionersFiltersSchema } from "../dto/practitioner.dto";
import { practitionerRoleHelper } from "../schemas/practitioner-role.schema";

@Controller("/practitioners")
export class PractitionersController {
    constructor(
        private readonly practitionersCrudUseCases: PractitionersCrudUseCases
    ) {
    }

    @Get("/roles")
    async getPractitionersRolesWithSpecialties() {
        return practitionerRoleHelper.getAllRolesWithSpecialties()
    }

    @Get()
    async getPatients(
        @AjvQuery(getPractitionersFiltersSchema) filters: GetPractitionersFilters
    ) {
        const res = await this.practitionersCrudUseCases.findWithPagination(filters);
        return CustomResponse.fromResult(res);
    }
}
