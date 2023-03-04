import { Controller, Get, Param, Put } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { generalTreatmentAjvSchema, GeneralTreatmentPlanDto } from "./dto";
import { GeneralTreatmentPlanService } from "./general-treatment-plan.service";



@Controller("/card/:id/general-treatment-plan")
export class GeneralTreatmentPlanController {

    constructor(
        private readonly generalTreatmentPlanService: GeneralTreatmentPlanService
    ) { }


    @Get("")
    async getGeneralTreatmentPlan(
        @Param("id") cardId: string
    ): Promise<CustomResponse<GeneralTreatmentPlanDto>> {
        return CustomResponse.fromResult(
            await this.generalTreatmentPlanService.getGeneralTreatmentPlan(cardId)
        )
    }

    @Put("")
    async updateGeneralTreatmentPlan(
        @Param("id") cardId: string,
        @AjvBody(generalTreatmentAjvSchema) data: GeneralTreatmentPlanDto
    ): Promise<CustomResponse> {
        return CustomResponse.fromResult(
            await this.generalTreatmentPlanService.updateGeneralTreatmentPlan(cardId, data)
        )
    }
}
