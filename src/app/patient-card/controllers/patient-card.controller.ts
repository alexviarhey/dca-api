import { Controller, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { AjvBody, AjvQuery } from "../../common/decorators/ajv.decorators";
import { commonDiseasesAjvSchema, CommonDiseasesDto, UpdateCommonDiseasesDto } from "../dto/common-diseases.dto";
import { externalExaminationAjvSchema, ExternalExaminationDto } from "../dto/external-examination.dto";
import { generalTreatmentAjvSchema, GeneralTreatmentPlanDto } from "../dto/general-treatment-plan.dto";
import { DentalStatusDto, dentalStatusAjvSchema } from "../dto/dental-status.dto";
import { GeneralTreatmentPlanService } from "../services/general-treatment-plan.service";
import { CommonDiseasesService } from "../services/common-diseases.service";
import { ExternalExaminationService } from "../services/external-examination.service";
import { DentalStatusTabService } from "../services/dental-status.service";
import { CreateVisitDto, ShortVisitDto, VisitDto, createVisitAjvSchema } from "../dto/visit.dto";
import { CreateVisitUseCase } from "../use-cases/create-visit.use-case";
import { GetVisitUseCase } from "../use-cases/get-visit.use-case";
import { GetAllVisitsUseCase } from "../use-cases/get-all-visits.use-case";
import { UpdateVisitUseCase } from "../use-cases/update-visit.use-case";
import { GetDocxQuery, getDocxQuerySchema } from "../dto/docx.dto";
import { DocxService } from "../services/docx/docx.service";
import { CustomResponseInterceptor } from "../../common/interceptors/custom-response.interceptor";
import { Result } from "../../../core/result";


const commonDiseasesRoutingKey = '/common-diseases'
const externalExaminationRoutingKey = '/external-examination'
const generalTreatmentPlanRoutingKey = '/general-treatment-plan'
const dentalStatusRoutingKey = '/dental-status'
const visitsRoutingKey = '/visits'

@Controller("/card/:id")
@UseInterceptors(CustomResponseInterceptor)
export class PatientCardController {

    constructor(
        private readonly generalTreatmentPlanService: GeneralTreatmentPlanService,
        private readonly commonDiseasesService: CommonDiseasesService,
        private readonly externalExaminationService: ExternalExaminationService,
        private readonly dentalStatusTabService: DentalStatusTabService,
        private readonly createVisitUseCase: CreateVisitUseCase,
        private readonly getVisitUseCase: GetVisitUseCase,
        private readonly getAllVisitsUseCase: GetAllVisitsUseCase,
        private readonly updateVisitUseCase: UpdateVisitUseCase,
        private readonly docxService: DocxService
    ) { }

    @Get(commonDiseasesRoutingKey)
    async getCommonDiseases(
        @Param("id") cardId: string
    ): Promise<Result<CommonDiseasesDto>> {
        return this.commonDiseasesService.getTabData(cardId)
    }

    @Put(commonDiseasesRoutingKey)
    async update(
        @AjvBody(commonDiseasesAjvSchema) dto: UpdateCommonDiseasesDto,
        @Param("id") cardId: string
    ) {
        return this.commonDiseasesService.updateTabData(cardId, dto)
    }

    @Get(externalExaminationRoutingKey)
    async getExternalExamination(
        @Param("id") cardId: string
    ): Promise<Result<ExternalExaminationDto>> {
        return this.externalExaminationService.getTabData(cardId)
    }

    @Put(externalExaminationRoutingKey)
    async updateExternalExamination(
        @Param("id") cardId: string,
        @AjvBody(externalExaminationAjvSchema) data: ExternalExaminationDto
    ): Promise<Result> {
        return this.externalExaminationService.updateTabData(cardId, data)
    }

    @Get(generalTreatmentPlanRoutingKey)
    async getGeneralTreatmentPlan(
        @Param("id") cardId: string
    ): Promise<Result<GeneralTreatmentPlanDto>> {
        return this.generalTreatmentPlanService.getTabData(cardId)
    }

    @Put(generalTreatmentPlanRoutingKey)
    async updateGeneralTreatmentPlan(
        @Param("id") cardId: string,
        @AjvBody(generalTreatmentAjvSchema) data: GeneralTreatmentPlanDto
    ): Promise<Result> {
        return this.generalTreatmentPlanService.updateTabData(cardId, data)
    }

    @Get(dentalStatusRoutingKey)
    async getDentalStatus(
        @Param("id") cardId: string
    ): Promise<Result<DentalStatusDto>> {
        return this.dentalStatusTabService.getTabData(cardId)
    }

    @Put(dentalStatusRoutingKey)
    async updateDentalStatus(
        @Param("id") cardId: string,
        @AjvBody(dentalStatusAjvSchema) data: DentalStatusDto
    ): Promise<Result<DentalStatusDto>> {
        return this.dentalStatusTabService.updateTabData(cardId, data)
    }

    @Post(visitsRoutingKey)
    async createVisit(
        @Param("id") cardId: string,
        @AjvBody(createVisitAjvSchema) data: CreateVisitDto
    ): Promise<Result> {
        return this.createVisitUseCase.execute(cardId, data)
    }

    @Put(`${visitsRoutingKey}/:visitId`)
    async updateVisit(
        @Param("id") cardId: string,
        @Param("visitId") visitId: string,
        @AjvBody(createVisitAjvSchema) data: CreateVisitDto
    ): Promise<Result> {
        return this.updateVisitUseCase.execute(cardId, visitId, data)
    }

    @Get(`${visitsRoutingKey}/:visitId`)
    async getVisit(
        @Param("id") cardId: string,
        @Param("visitId") visitId: string,
    ): Promise<Result<VisitDto>> {
        return this.getVisitUseCase.execute(cardId, visitId)
    }

    @Get(`${visitsRoutingKey}`)
    async getAllVisits(
        @Param("id") cardId: string,
    ): Promise<Result<ShortVisitDto[]>> {
        return this.getAllVisitsUseCase.execute(cardId)
    }

    @Get('/docx')
    async getDocx(
        @Param("id") cardId: string,
        @AjvQuery(getDocxQuerySchema) query: GetDocxQuery
    ) {
        return this.docxService.getDocx({
            cardId: cardId,
            page: query.page,
            visitId: query.visitId
        })
    }
}
