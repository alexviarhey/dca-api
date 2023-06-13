import { Controller, Get, Param, Put } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { commonDiseasesAjvSchema, CommonDiseasesDto, UpdateCommonDiseasesDto } from "../dto/common-diseases.dto";
import { externalExaminationAjvSchema, ExternalExaminationDto } from "../dto/external-examination.dto";
import { generalTreatmentAjvSchema, GeneralTreatmentPlanDto } from "../dto/general-treatment-plan.dto";
import { CommonDiseasesService, DentalStatusTabService, ExternalExaminationService, GeneralTreatmentPlanService } from "../services/card-tab.services";
import { DentalStatusDto, dentalStatusAjvSchema } from "../dto/dental-status.dto";


const commonDiseasesRoutingKey = '/common-diseases'
const externalExaminationRoutingKey = '/external-examination'
const generalTreatmentPlanRoutingKey = '/general-treatment-plan'
const dentalStatusRoutingKey = '/dental-status'


@Controller("/card/:id")
export class PatientCardController {

    constructor(
        private readonly generalTreatmentPlanService: GeneralTreatmentPlanService,
        private readonly commonDiseasesService: CommonDiseasesService,
        private readonly externalExaminationService: ExternalExaminationService,
        private readonly dentalStatusTabService: DentalStatusTabService,
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

    @Put(dentalStatusRoutingKey)
    async updateDentalStatus(
        @Param("id") cardId: string,
        @AjvBody(dentalStatusAjvSchema) data: DentalStatusDto
    ): Promise<CustomResponse> {
        return CustomResponse.fromResult(
            await this.dentalStatusTabService.updateTabData(cardId, data)
        )
    }
}
