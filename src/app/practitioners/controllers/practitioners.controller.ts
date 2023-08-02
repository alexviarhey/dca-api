import { Controller, Get, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { PractitionersCrudUseCases } from "../use-cases/practitioners.crud.use-cases";
import { CreatePractitionerDto, GetPractitionersFilters, UpdatePractitionerDto, createPractitionerSchema, getPractitionersFiltersSchema, updatePractitionerSchema } from "../dto/practitioner.dto";
import { practitionerRoleHelper } from "../schemas/practitioner-role.schema";
import { ContactPointHelper } from "../../common/dto/contact-point.dtos";
import { CustomResponseInterceptor } from "../../common/interceptors/custom-response.interceptor";

@Controller("/practitioners")
@UseInterceptors(CustomResponseInterceptor)
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
    async getPractitioners(
        @AjvQuery(getPractitionersFiltersSchema) filters: GetPractitionersFilters
    ) {
        return this.practitionersCrudUseCases.findWithPagination(filters);
    }

    @Get("/:id")
    async getPractitionerById(
        @Query("id") id: string
    ) {
        return this.practitionersCrudUseCases.findById(id)
    }

    @Post()
    async createPractitioner(
        @AjvBody(createPractitionerSchema) dto: CreatePractitionerDto
    ) {
        const roles = dto.roles

        const res = practitionerRoleHelper.validateListOfRoles(roles)
        if(res.isSuccess) return res

        return this.practitionersCrudUseCases.create(
            dto,
            ContactPointHelper.getFilterByPhone(dto)
        )
    }

    @Put()
    async updatePractitioner(
        @AjvBody(updatePractitionerSchema) dto: UpdatePractitionerDto
    ) {
        const { id, ...fields } = dto

        return this.practitionersCrudUseCases.updateOne(
            id,
            fields,
            ContactPointHelper.getFilterByPhone(dto)
        )
    }
}
