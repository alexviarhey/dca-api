import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import {
    CreatePatientDto,
    createPatientValidationSchema, InactivatePatientDto, inactivatePatientSchema,
    PatientDto, UpdatePatientDto,
    updatePatientValidationSchema
} from "../dto/patient.dtos";
import { CustomResponse, CustomResponseType } from "../../../core/custom-response";
import { PatientsCrudUseCases } from "../use-cases/patients.crud-use-cases";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { GetPatientsFilters, getPatientsFiltersSchema } from "../dto/get-patients-filters";
import { Paginated } from "../../../core/paginated";
import { GetPatientCardsUserCase } from "../use-cases/get-patient-cards.use-case";

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
@ApiTags("Patients")
export class PatientsController {

    constructor(
        private readonly patientsCrudUseCases: PatientsCrudUseCases,
        private readonly getPatientCardsUseCase: GetPatientCardsUserCase
    ) {
    }

    @Post()
    @ApiBody({ type: CreatePatientDto })
    @ApiOkResponse({ type: CreatePatientResponse })
    async create(
        @AjvBody(createPatientValidationSchema) dto: CreatePatientDto
    ) {
        const res = await this.patientsCrudUseCases.create(
            dto,
            this.patientsCrudUseCases.getFiltersForUniqueness(dto)
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Пациент успешно создан!");
    }

    @Put()
    @ApiOkResponse({ type: CustomResponseType<null> })
    async inactivate(
        @AjvBody(inactivatePatientSchema) dto: InactivatePatientDto
    ) {
        const res = await this.patientsCrudUseCases.inactivatePatient(dto._id);
        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Пациент успещно заархивирован!");
    }

    @Put()
    @ApiBody({ type: UpdatePatientDto })
    @ApiOkResponse({ type: GetPatientsResponse })
    async update(
        @AjvBody(updatePatientValidationSchema) { _id, ...dto }: UpdatePatientDto
    ) {
        const res = await this.patientsCrudUseCases.updateOne(
            _id,
            dto,
            this.patientsCrudUseCases.getFiltersForUniqueness(dto)
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Пациент успешно обновлен!");
    }

    @Get()
    @ApiOkResponse({ type: GetPatientsResponse })
    @ApiQuery({ type: GetPatientsFilters })
    async getPatients(
        @AjvQuery(getPatientsFiltersSchema) filters: GetPatientsFilters
    ) {
        const res = await this.patientsCrudUseCases.findWithPagination(filters);
        return CustomResponse.fromResult(res);
    }

    @Get("/:id")
    @ApiOkResponse({ type: GetPatientResponse })
    async getPatient(
        @Param("id") id: string
    ) {
        const res = await this.patientsCrudUseCases.findById(id);
        return CustomResponse.fromResult(res);
    }

    @Get("/:id/cards")
    async getPatientCards(
        @Param("id") id: string
    ) {
        return CustomResponse.fromResult(
            await this.getPatientCardsUseCase.execute(id)
        )
    }
}
