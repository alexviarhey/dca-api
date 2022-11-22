import { Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreatePatientDto, PatientDto } from "../dto/patient.dtos";
import { CustomResponse, CustomResponseType } from "../../../core/custom-response";
import { PatientsCrudUseCases } from "../use-cases/patients.crud-use-cases";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { patientSchema } from "../schemas/patient.schema";
import { GetPatientsFilters, getPatientsFiltersSchema } from "../dto/get-patients-filters";
import { Paginated } from "../../../core/paginated";

class CreatePatientResponse extends CustomResponseType<PatientDto> {
    @ApiProperty({ type: PatientDto})
    data: PatientDto;
}

class PaginatedPatients extends Paginated<PatientDto> {
    @ApiProperty({ type: PatientDto, isArray: true })
    items: PatientDto[]
}

class GetPatientsResponse extends CustomResponseType<PaginatedPatients> {
    @ApiProperty({ type: PaginatedPatients })
    data: PaginatedPatients;
}

const GetPatientResponse = CreatePatientResponse

@Controller("/patients")
@ApiTags("Patients")
export class PatientsController {

    constructor(
        private readonly patientsCrudUseCases: PatientsCrudUseCases
    ) {
    }

    @Post()
    @ApiBody({ type: CreatePatientDto })
    @ApiOkResponse({ type: CreatePatientResponse })
    async create(
        @AjvBody(patientSchema) dto: CreatePatientDto
    ) {
        const res = await this.patientsCrudUseCases.create(dto);
        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Пациент успешно создан!");
    }

    @Get()
    @ApiOkResponse({ type: GetPatientsResponse})
    @ApiQuery({ type: GetPatientsFilters })
    async getPatients(
        @AjvQuery(getPatientsFiltersSchema) filters: GetPatientsFilters
    ) {
        const res = await this.patientsCrudUseCases.findWithPagination(filters);
        return CustomResponse.fromResult(res);
    }

    @Get("/:id")
    @ApiOkResponse({ type: GetPatientResponse})
    async getPatient(
        @Param("id") id: string
    ) {
        const res = await this.patientsCrudUseCases.findById(id)
        return CustomResponse.fromResult(res);
    }
}