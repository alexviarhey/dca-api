import { Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { AjvBody, AjvQuery } from "../../patient-card/common/decorators/ajv.decorators";
import { PractitionersCrudUseCases } from "../use-cases/practitioners.crud.use-cases";
import { CreatePractitionerDto, GetPractitionersFilters, UpdatePractitionerDto, createPractitionerSchema, getPractitionersFiltersSchema, updatePractitionerSchema } from "../dto/practitioner.dto";
import { practitionerRoleHelper } from "../schemas/practitioner-role.schema";
import { ContactPointHelper } from "../../patient-card/common/dto/contact-point.dtos";
import { CustomResponseInterceptor } from "../../patient-card/common/interceptors/custom-response.interceptor";
import { FilterQuery } from "mongoose";

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
        @Param("id") id: string
    ) {
        return this.practitionersCrudUseCases.findById(id)
    }

    @Post()
    async createPractitioner(
        @AjvBody(createPractitionerSchema) dto: CreatePractitionerDto
    ) {
        const roles = dto.roles

        const res = practitionerRoleHelper.validateListOfRoles(roles)
        if(!res.isSuccess) return res

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

        const filters = {
            _id: {$ne: id},
            ...ContactPointHelper.getFilterByPhone(dto)
        }

        return this.practitionersCrudUseCases.updateOne(
            id,
            fields ,
            filters
        )
    }
}
