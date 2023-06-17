import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { commonDiseasesAjvSchema, CommonDiseasesDto, UpdateCommonDiseasesDto } from "../dto/common-diseases.dto";
import { externalExaminationAjvSchema, ExternalExaminationDto } from "../dto/external-examination.dto";
import { generalTreatmentAjvSchema, GeneralTreatmentPlanDto } from "../dto/general-treatment-plan.dto";
import { DentalStatusDto } from "../dto/dental-status.dto";
import { GeneralTreatmentPlanService } from "../services/general-treatment-plan.service";
import { CommonDiseasesService } from "../services/common-diseases.service";
import { ExternalExaminationService } from "../services/external-examination.service";
import { DentalStatusTabService } from "../services/dental-status.service";
import { CreateVisitDto, ShortVisitDto, VisitDto, createVisitAjvSchema } from "../dto/visit.dto";
import { CreateVisitUseCase } from "../use-cases/create-visit.use-case";
import { GetVisitUseCase } from "../use-cases/get-visit.use-case";
import { GetAllVisitsUseCase } from "../use-cases/get-all-visits.use-case";
import { UpdateVisitUseCase } from "../use-cases/update-visit.use-case";


const commonDiseasesRoutingKey = '/common-diseases'
const externalExaminationRoutingKey = '/external-examination'
const generalTreatmentPlanRoutingKey = '/general-treatment-plan'
const dentalStatusRoutingKey = '/dental-status'
const visitsRoutingKey = '/visits'

@Controller("/card/:id")
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
    ) { }

    @Get(commonDiseasesRoutingKey)
    async getCommonDiseases(
        @Param("id") cardId: string
    ): Promise<CustomResponse<CommonDiseasesDto>> {
        return CustomResponse.fromResult(
            await this.commonDiseasesService.getTabData(cardId)
        )
    }

    @Put(commonDiseasesRoutingKey)
    async update(
        @AjvBody(commonDiseasesAjvSchema) dto: UpdateCommonDiseasesDto,
        @Param("id") cardId: string
    ) {
        return CustomResponse
            .fromResult(
                await this.commonDiseasesService.updateTabData(cardId, dto)
            )
    }

    @Get(externalExaminationRoutingKey)
    async getExternalExamination(
        @Param("id") cardId: string
    ): Promise<CustomResponse<ExternalExaminationDto>> {
        return CustomResponse.fromResult(
            await this.externalExaminationService.getTabData(cardId)
        )
    }

    @Put(externalExaminationRoutingKey)
    async updateExternalExamination(
        @Param("id") cardId: string,
        @AjvBody(externalExaminationAjvSchema) data: ExternalExaminationDto
    ): Promise<CustomResponse> {
        return CustomResponse.fromResult(
            await this.externalExaminationService.updateTabData(cardId, data)
        )
    }

    @Get(generalTreatmentPlanRoutingKey)
    async getGeneralTreatmentPlan(
        @Param("id") cardId: string
    ): Promise<CustomResponse<GeneralTreatmentPlanDto>> {
        return CustomResponse.fromResult(
            await this.generalTreatmentPlanService.getTabData(cardId)
        )
    }

    @Put(generalTreatmentPlanRoutingKey)
    async updateGeneralTreatmentPlan(
        @Param("id") cardId: string,
        @AjvBody(generalTreatmentAjvSchema) data: GeneralTreatmentPlanDto
    ): Promise<CustomResponse> {
        return CustomResponse.fromResult(
            await this.generalTreatmentPlanService.updateTabData(cardId, data)
        )
    }

    @Get(dentalStatusRoutingKey)
    async getDentalStatus(
        @Param("id") cardId: string
    ): Promise<CustomResponse<DentalStatusDto>> {
        return CustomResponse.fromResult(
            await this.dentalStatusTabService.getTabData(cardId)
        )
    }

    @Post(visitsRoutingKey)
    async createVisit(
        @Param("id") cardId: string,
        @AjvBody(createVisitAjvSchema) data: CreateVisitDto
    ): Promise<CustomResponse> {
        return CustomResponse
            .fromResult(await this.createVisitUseCase.execute(cardId, data))
            .withSuccessMessage('Визит успешно добавлен!')
    }

    @Put(`${visitsRoutingKey}/visitId`)
    async updateVisit(
        @Param("id") cardId: string,
        @Param("visitId") visitId: string,
        @AjvBody(createVisitAjvSchema) data: CreateVisitDto
    ): Promise<CustomResponse> {
        return CustomResponse
            .fromResult(await this.updateVisitUseCase.execute(cardId, visitId, data))
            .withSuccessMessage('Визит успешно обновлен!')
    }

    @Get(`${visitsRoutingKey}/visitId`)
    async getVisit(
        @Param("id") cardId: string,
        @Param("visitId") visitId: string,
    ): Promise<CustomResponse<VisitDto>> {
        return CustomResponse.fromResult(
            await this.getVisitUseCase.execute(cardId, visitId)
        )
    }

    @Get(`${visitsRoutingKey}`)
    async getAllVisits(
        @Param("id") cardId: string,
    ): Promise<CustomResponse<ShortVisitDto[]>> {
        return CustomResponse.fromResult(
            await this.getAllVisitsUseCase.execute(cardId)
        )
    }
}
