import { Controller, Post, Put } from "@nestjs/common";
import { CustomResponse, CustomResponseType } from "../../../core/custom-response";
import { CreateTemplateDto, createTemplateSchema, TemplateDto } from "../dto/templates.dto";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { TemplatesCrudUseCases } from "../use-cases/templates.crud-use-cases";
import { AjvBody } from "../../common/decorators/ajv.decorators";

class CreateTemplateResponseType extends CustomResponseType<TemplateDto> {
    data: TemplateDto;
}

@Controller("/templates")
export class TemplatesController {

    constructor(
        private readonly templatesCrudUseCases: TemplatesCrudUseCases
    ) {
    }

    @Post("")
    @ApiCreatedResponse({ type: CreateTemplateResponseType })
    async createTemplate(
        @AjvBody(createTemplateSchema) dto: CreateTemplateDto
    ) {

        const res = await this.templatesCrudUseCases.create(
            dto,
            null,
            { and: ["name", "type"] }
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Шаблон успешно создан!");
    }

    @Put("")
    @ApiCreatedResponse({ type: CreateTemplateResponseType })
    async updateTemplate(
        @AjvBody(createTemplateSchema) dto: CreateTemplateDto
    ) {

        const res = await this.templatesCrudUseCases.create(dto);
        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Шаблон успешно создан!");
    }

}