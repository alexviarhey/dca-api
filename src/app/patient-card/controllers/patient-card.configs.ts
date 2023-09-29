import { Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { AjvBody, AjvQuery } from "../common/decorators/ajv.decorators";
import { commonDiseasesAjvSchema, CommonDiseasesDto, UpdateCommonDiseasesDto } from "../dto/common-diseases.dto";
import { externalExaminationAjvSchema, ExternalExaminationDto } from "../dto/external-examination.dto";
import { generalTreatmentAjvSchema, GeneralTreatmentPlanDto } from "../dto/general-treatment-plan.dto";
import { DentalStatusDto, dentalStatusAjvSchema } from "../dto/dental-status.dto";
import { CreateVisitDto, ShortVisitDto, VisitDto, createVisitAjvSchema } from "../dto/visit.dto";
import { GetDocxQuery, getDocxQuerySchema } from "../dto/docx.dto";
import { CustomResponseInterceptor } from "../common/interceptors/custom-response.interceptor";
import { Result } from "../../../core/result";



@Controller("/card/configs")
@UseInterceptors(CustomResponseInterceptor)
export class PatientCardController {

    constructor() { }

    @Get()
    async getConfigs(
    ): Promise<void> {
    }

}
