import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { CustomResponse, CustomResponseType } from "../../../core/custom-response";
import {
    CreateTemplateDto,
    createTemplateSchema, GetTemplatesFilters,
    TemplateDto,
    UpdateTemplateDto,
    updateTemplateSchema
} from "../dto/templates.dto";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { TemplatesCrudUseCases } from "../use-cases/templates.crud-use-cases";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { ResponseMessages } from "../../../core/response-messages";
import { IdDto } from "../../common/dto/id.dto";
import { Paginated, Pagination } from "../../../core/paginated";
import { FilterQuery } from "mongoose";
import { ITemplateSchema } from "../schemas/template.schema";
import { filter } from "rxjs";

class CreateTemplateResponseType extends CustomResponseType<TemplateDto> {
    data: TemplateDto;
}

class PaginatedTemplates extends Paginated<TemplateDto> {
    @ApiProperty({ type: TemplateDto, isArray: true })
    items: TemplateDto[];
}

class GetTemplatesResponseType extends CustomResponseType<PaginatedTemplates> {
    @ApiProperty({ type: PaginatedTemplates })
    data: PaginatedTemplates;
}

class GetTemplateResponseType extends CustomResponseType<TemplateDto> {
    data: TemplateDto;
}

@Controller("/templates")
export class TemplatesController {

    responseMessages: ResponseMessages;

    constructor(
        private readonly templatesCrudUseCases: TemplatesCrudUseCases
    ) {
        this.responseMessages = new ResponseMessages(templatesCrudUseCases.modelName);
    }

    @Post("")
    @ApiCreatedResponse({ type: CreateTemplateResponseType })
    @ApiBody({ type: CreateTemplateDto })
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
            .withSuccessMessage(this.responseMessages.createdSuccessfully);
    }

    @Put("")
    @ApiOkResponse({ type: CreateTemplateResponseType })
    @ApiBody({ type: UpdateTemplateDto })
    async updateTemplate(
        @AjvBody(updateTemplateSchema) { _id, ...dto }: UpdateTemplateDto
    ) {

        const res = await this.templatesCrudUseCases.updateOne(_id, dto);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage(this.responseMessages.updatedSuccessfully);
    }

    @Delete("")
    @ApiBody({ type: IdDto })
    async deleteTemplate(
        @Body() dto: IdDto
    ) {

        const res = await this.templatesCrudUseCases.deleteById(dto.id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage(this.responseMessages.deletedSuccessfully);
    }

    @Get("")
    @ApiOkResponse({ type: PaginatedTemplates })
    @ApiQuery({ type: GetTemplatesFilters })
    async getTemplates(
        @Query() filters: GetTemplatesFilters
    ) {
        const paginated = Pagination.fromFilters(filters);

        const filterQuery: FilterQuery<ITemplateSchema> = {};

        if (filters.type) filterQuery.type = filters.type;

        if (filters.icdIds) filterQuery.icdIds = { $all: filters.icdIds };

        if (filters.searchQuery) {
            filterQuery.$or = [
                { name: { $regex: `/^${filters.searchQuery}/i` } },
                { description: { $regex: `/^${filters.searchQuery}/i` } }
            ];
        }

        const res = await this.templatesCrudUseCases.findWithPagination(filterQuery, paginated);

        return CustomResponse.fromResult(res);
    }
}