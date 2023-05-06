import { Controller, Get, Post } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { PractitionersCrudUseCases } from "../use-cases/practitioners.crud.use-cases";
import { CreatePractitionerDto, GetPractitionersFilters, createPractitionerSchema, getPractitionersFiltersSchema } from "../dto/practitioner.dto";
import { practitionerRoleHelper } from "../schemas/practitioner-role.schema";
import { ContactPointHelper } from "../../common/dto/contact-point.dtos";
import { Result } from "../../../core/result";

@Controller("/practitioners")
export class PractitionersController {
    constructor(
        private readonly practitionersCrudUseCases: PractitionersCrudUseCases
    ) {
    }

    @Get("/roles")
    async getPractitionersRolesWithSpecialties() {
        return CustomResponse.fromResult(Result.ok(
            practitionerRoleHelper.getAllRolesWithSpecialties()
        ))
    }

    @Get()
    async getPractitioners(
        @AjvQuery(getPractitionersFiltersSchema) filters: GetPractitionersFilters
    ) {
        const res = await this.practitionersCrudUseCases.findWithPagination(filters);
        return CustomResponse.fromResult(res);
    }

    @Post()
    async createPractitioner(
        @AjvBody(createPractitionerSchema) dto: CreatePractitionerDto
    ) {
        const roles = dto.roles

        const res = practitionerRoleHelper.validateListOfRoles(roles)
        if (!res.isSuccess) return CustomResponse.validationError({
            field: 'role',
            message: res.error
        })

        const createPractitionerRes = await this.practitionersCrudUseCases.create(
            dto,
            ContactPointHelper.getFilterByPhone(dto)
        )

        return CustomResponse.fromResult(createPractitionerRes)
    }
}
