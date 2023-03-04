import { Controller, Get, Param, Put } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { externalExaminationAjvSchema, ExternalExaminationDto } from "./dto";
import { ExternalExaminationService } from "./external-examination.service";


@Controller("/card/:id/external-examination")
export class ExternalExaminationController {

    constructor(
        private readonly externalExaminationService: ExternalExaminationService
    ) { }

    @Get()
    async getExternalExamination(
        @Param("id") cardId: string
    ): Promise<CustomResponse<ExternalExaminationDto>> {
        return CustomResponse.fromResult(
            await this.externalExaminationService.getExternalExamination(cardId)
        )
    }

    @Put()
    async updateExternalExamination(
        @Param("id") cardId: string,
        @AjvBody(externalExaminationAjvSchema) data: ExternalExaminationDto
    ): Promise<CustomResponse> {
        return CustomResponse.fromResult(
            await this.externalExaminationService.updateExternalExamination(cardId, data)
        )
    }

}
