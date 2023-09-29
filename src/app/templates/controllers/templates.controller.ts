import { Body, Controller, Delete, Get, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { CustomResponseType } from "../../../core/custom-response";
import {
    CreateTemplateDto,
    createTemplateSchema, GetTemplatesFilters,
    TemplateDto,
    UpdateTemplateDto,
    updateTemplateSchema
} from "../dto/templates.dto";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TemplatesCrudUseCases } from "../use-cases/templates.crud-use-cases";
import { AjvBody } from "../../patient-card/common/decorators/ajv.decorators";
import { IdDto } from "../../patient-card/common/dto/id.dto";
import { Paginated, Pagination } from "../../../core/paginated";
import { FilterQuery } from "mongoose";
import { ITemplateSchema } from "../schemas/template.schema";
import { TemplatesGroups, TemplatesService } from "../services/templates.service";
import { CustomResponseInterceptor } from "../../patient-card/common/interceptors/custom-response.interceptor";
import { Result } from "../../../core/result";

class CreateTemplateResponseType extends CustomResponseType<TemplateDto> {
    @ApiProperty({ type: TemplateDto })
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

@Controller("/templates")
@UseInterceptors(CustomResponseInterceptor)
@ApiTags("Templates")
export class TemplatesController {
    constructor(
        private readonly templatesCrudUseCases: TemplatesCrudUseCases,
        private readonly templateService: TemplatesService
    ) {}

    @Post("")
    @ApiCreatedResponse({ type: CreateTemplateResponseType })
    @ApiBody({ type: CreateTemplateDto })
    async createTemplate(
        @AjvBody(createTemplateSchema) dto: CreateTemplateDto
    ) {
        return this.templatesCrudUseCases.create(dto, null, { and: ["name", "type"] })
    }

    @Put("")
    @ApiOkResponse({ type: CreateTemplateResponseType })
    @ApiBody({ type: UpdateTemplateDto })
    async updateTemplate(
        @AjvBody(updateTemplateSchema) { _id, ...dto }: UpdateTemplateDto
    ) {
        return this.templatesCrudUseCases.updateOne(_id, dto)
    }

    @Delete("")
    @ApiBody({ type: IdDto })
    async deleteTemplate(
        @Body() dto: IdDto
    ) {
        return this.templatesCrudUseCases.deleteById(dto.id)
    }

    @Get("")
    @ApiOkResponse({ type: GetTemplatesResponseType })
    @ApiQuery({ type: GetTemplatesFilters })
    async getTemplates(
        @Query() filters: GetTemplatesFilters
    ) {
        const paginated = Pagination.fromFilters(filters);

        const filterQuery: FilterQuery<ITemplateSchema> = {};

        if (filters.type) filterQuery.type = filters.type;

        if (filters.icdIds) filterQuery.icdIds = { $all: filters.icdIds };

        const searchQuery = filters.searchQuery;

        if (searchQuery) {
            filterQuery.$or = [
                { name: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } }
            ];
        }

        return this.templatesCrudUseCases.findWithPagination(filterQuery, paginated)
    }

    @Post("/get-text")
    public async generateTextFromTemplates(
        @Body() templateGroups: TemplatesGroups
    ): Promise<Result<{ [key: string]: string }>> {
        return this.templateService.fillTemplatesGroups(templateGroups)
    }
}
