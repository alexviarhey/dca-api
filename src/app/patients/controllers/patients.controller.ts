import { Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
    CreatePatientDto,
    createPatientValidationSchema, InactivatePatientDto, inactivatePatientSchema,
    PatientDto, UpdatePatientDto,
    updatePatientValidationSchema
} from "../dto/patient.dtos";
import { CustomResponseType } from "../../../core/custom-response";
import { PatientsCrudUseCases } from "../use-cases/patients.crud-use-cases";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { GetPatientsFilters, getPatientsFiltersSchema } from "../dto/get-patients-filters";
import { Paginated } from "../../../core/paginated";
import { GetPatientCardsUserCase } from "../use-cases/get-patient-cards.use-case";
import { CustomResponseInterceptor } from "../../common/interceptors/custom-response.interceptor";

class CreatePatientResponse extends CustomResponseType<PatientDto> {
    @ApiProperty({ type: PatientDto })
    data: PatientDto;
}

class PaginatedPatients extends Paginated<PatientDto> {
    @ApiProperty({ type: PatientDto, isArray: true })
    items: PatientDto[];
}

class GetPatientsResponse extends CustomResponseType<PaginatedPatients> {
    @ApiProperty({ type: PaginatedPatients })
    data: PaginatedPatients;
}

const GetPatientResponse = CreatePatientResponse;

@Controller("/patients")
@UseInterceptors(CustomResponseInterceptor)
@ApiTags("Patients")
export class PatientsController {

    constructor(
        private readonly patientsCrudUseCases: PatientsCrudUseCases,
        private readonly getPatientCardsUseCase: GetPatientCardsUserCase
    ) {}

    @Post()
    @ApiBody({ type: CreatePatientDto })
    @ApiOkResponse({ type: CreatePatientResponse })
    async create(
        @AjvBody(createPatientValidationSchema) dto: CreatePatientDto
    ) {
        return this.patientsCrudUseCases.create(
            dto,
            this.patientsCrudUseCases.getFiltersForUniqueness(dto)
        );
    }

    @Put("/inactivate")
    @ApiOkResponse({ type: CustomResponseType<null> })
    async inactivate(
        @AjvBody(inactivatePatientSchema) dto: InactivatePatientDto
    ) {
        return this.patientsCrudUseCases.inactivatePatient(dto._id);
    }

    @Put()
    @ApiBody({ type: UpdatePatientDto })
    @ApiOkResponse({ type: GetPatientsResponse })
    async update(
        @AjvBody(updatePatientValidationSchema) { _id, ...dto }: UpdatePatientDto
    ) {
        return this.patientsCrudUseCases.updateOne(
            _id,
            dto,
            this.patientsCrudUseCases.getFiltersForUniqueness(dto)
        );
    }

    @Get()
    @ApiOkResponse({ type: GetPatientsResponse })
    @ApiQuery({ type: GetPatientsFilters })
    async getPatients(
        @AjvQuery(getPatientsFiltersSchema) filters: GetPatientsFilters
    ) {
        return this.patientsCrudUseCases.findWithPagination(filters);
    }

    @Get("/:id")
    @ApiOkResponse({ type: GetPatientResponse })
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
