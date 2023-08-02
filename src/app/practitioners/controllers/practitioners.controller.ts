import { Controller, Get, Post, Put, Query } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { PractitionersCrudUseCases } from "../use-cases/practitioners.crud.use-cases";
import { CreatePractitionerDto, GetPractitionersFilters, UpdatePractitionerDto, createPractitionerSchema, getPractitionersFiltersSchema, updatePractitionerSchema } from "../dto/practitioner.dto";
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

    @Get("/:id")
    async getPractitionerById(
        @Query("id") id: string
    ) {
        const res = await this.practitionersCrudUseCases.findById(id)
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

        return CustomResponse
            .fromResult(createPractitionerRes)
            .withSuccessMessage('Сотрудник успешно создан!')
    }

    @Put()
    async updatePractitioner(
        @AjvBody(updatePractitionerSchema) dto: UpdatePractitionerDto
    ) {

        const {id, ...fields} = dto

        const res = await this.practitionersCrudUseCases.updateOne(
            id,
            fields,
            ContactPointHelper.getFilterByPhone(dto)
        )

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage('Сотрудник успешно обновлен!')
    }
}
