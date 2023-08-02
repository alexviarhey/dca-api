import { Controller, Delete, Get, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { PlaceholdersCrudUseCases } from "../use-cases/placeholders.crud-use-cases";
import { CustomResponseType } from "../../../core/custom-response";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import {
    CreatePlaceholderDto,
    createPlaceholderSchema, PlaceholderDto,
    UpdatePlaceholderDto,
    updatePlaceholderSchema
} from "../dto/placeholders.dto";
import { ResponseMessages } from "../../../core/response-messages";
import { IdDto, idDtoSchema } from "../../common/dto/id.dto";
import { templatePlaceholdersMapReadable } from "../schemas/placeholder";
import { Result } from "../../../core/result";
import { CustomResponseInterceptor } from "../../common/interceptors/custom-response.interceptor";

class PlaceholderResponseType extends CustomResponseType<PlaceholderDto> {
    @ApiProperty({ type: PlaceholderDto })
    data: PlaceholderDto;
}


@Controller("/templates/placeholders")
@UseInterceptors(CustomResponseInterceptor)
@ApiTags("Templates")
export class PlaceholdersController {
    private responseMessages: ResponseMessages;

    constructor(
        private placeholdersCrudUseCases: PlaceholdersCrudUseCases
    ) {
        this.responseMessages = new ResponseMessages("Плейсхолдер");
    }

    @Post("")
    @ApiCreatedResponse({ type: PlaceholderResponseType })
    @ApiBody({ type: CreatePlaceholderDto })
    async create(
        @AjvBody(createPlaceholderSchema) dto: CreatePlaceholderDto
    ) {
        return this.placeholdersCrudUseCases.create(dto, null, { or: ["name", "placeholder"] })
    }

    @Put("")
    @ApiOkResponse({ type: PlaceholderResponseType })
    @ApiBody({ type: UpdatePlaceholderDto })
    async update(
        @AjvBody(updatePlaceholderSchema) { _id, ...dto }: UpdatePlaceholderDto
    ) {
        return this.placeholdersCrudUseCases.updateOne(_id, dto, null, { or: ["name", "placeholder"] })
    }

    @Delete("")
    @ApiBody({ type: IdDto })
    async delete(
        @AjvBody(idDtoSchema) dto: IdDto
    ) {
        return this.placeholdersCrudUseCases.deleteById(dto.id)
    }

    @Get("")
    async getAll() {
        return Result.ok(templatePlaceholdersMapReadable);
    }
}
