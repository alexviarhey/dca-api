import { Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import {
    CreatePatientDto,
    createPatientValidationSchema, InactivatePatientDto, inactivatePatientSchema,
    UpdatePatientDto,
    updatePatientValidationSchema
} from "../dto/patient.dtos";
import { PatientsCrudUseCases } from "../use-cases/patients.crud-use-cases";
import { AjvBody, AjvQuery } from "../../patient-card/common/decorators/ajv.decorators";
import { GetPatientsFilters, getPatientsFiltersSchema } from "../dto/get-patients-filters";
import { GetPatientCardsUserCase } from "../use-cases/get-patient-cards.use-case";
import { CustomResponseInterceptor } from "../../patient-card/common/interceptors/custom-response.interceptor";


@Controller("/patients")
@UseInterceptors(CustomResponseInterceptor)
export class PatientsController {

    constructor(
        private readonly patientsCrudUseCases: PatientsCrudUseCases,
        private readonly getPatientCardsUseCase: GetPatientCardsUserCase
    ) { }

    @Post()
    async create(
        @AjvBody(createPatientValidationSchema) dto: CreatePatientDto
    ) {
        return this.patientsCrudUseCases.create(
            dto,
            this.patientsCrudUseCases.getFiltersForUniqueness(dto)
        );
    }

    @Put("/inactivate")
    async inactivate(
        @AjvBody(inactivatePatientSchema) dto: InactivatePatientDto
    ) {
        return this.patientsCrudUseCases.inactivatePatient(dto._id);
    }

    @Put()
    async update(
        @AjvBody(updatePatientValidationSchema) { _id, ...dto }: UpdatePatientDto
    ) {
        return this.patientsCrudUseCases.updateOne(
            _id,
            dto,
            this.patientsCrudUseCases.getFiltersForUniqueness(dto, _id)
        );
    }

    @Get()
    async getPatients(
        @AjvQuery(getPatientsFiltersSchema) filters: GetPatientsFilters
    ) {
        return this.patientsCrudUseCases.findWithPagination(filters);
    }

    @Get("/:id")
    async getPatient(
        @Param("id") id: string
    ) {
        return this.patientsCrudUseCases.findById(id);
    }

    @Get("/:id/cards")
    async getPatientCards(
        @Param("id") id: string
    ) {
        return this.getPatientCardsUseCase.execute(id)
    }
}
