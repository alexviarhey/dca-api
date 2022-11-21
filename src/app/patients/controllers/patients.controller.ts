import { Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { CreatePatientDto, PatientDto } from "../dto/patient.dtos";
import { CustomResponse, CustomResponseType } from "../../core/custom-response";
import { PatientsCrudUseCases } from "../use-cases/patients.crud-use-cases";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { patientSchema } from "../schemas/patient.schema";


class CreatePatientResponse extends CustomResponseType<PatientDto> {
    @ApiProperty({ type: PatientDto })
    data: PatientDto;
}

@Controller("/patients")
export class PatientsController {

    constructor(
        private readonly patientsCrudUseCases: PatientsCrudUseCases
    ) {}

    @Post()
    @ApiBody({ type: CreatePatientDto })
    @ApiOkResponse({ type: CreatePatientResponse })
    async create(
        @AjvBody(patientSchema) dto: CreatePatientDto
    ) {
        const res = await this.patientsCrudUseCases.create(dto);
        return CustomResponse
            .fromResult(res)
            .withSuccessMessage('Пациент успешно создан!')
    }
}