import { Controller, Delete, Get, Post, Put } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";
import { PlaceholdersCrudUseCases } from "../use-cases/placeholders.crud-use-cases";
import { CustomResponse, CustomResponseType } from "../../../core/custom-response";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import {
    CreatePlaceholderDto,
    createPlaceholderSchema, PlaceholderDto,
    UpdatePlaceholderDto,
    updatePlaceholderSchema
} from "../dto/placeholders.dto";
import { ResponseMessages } from "../../../core/response-messages";
import { IdDto, idDtoSchema } from "../../common/dto/id.dto";

class PlaceholderResponseType extends CustomResponseType<PlaceholderDto> {
    @ApiProperty({type: PlaceholderDto})
    data: PlaceholderDto;
}

class PlaceholdersResponseType extends CustomResponseType<PlaceholderDto[]> {
    @ApiProperty({type: PlaceholderDto, isArray: true})
    data: PlaceholderDto[];
}

@Controller("/templates/placeholders")
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

        return CustomResponse
            .fromResult(
                await this.placeholdersCrudUseCases.create(
                    dto,
                    null,
                    { or: ["name", "placeholder"] }
                )
            )
            .withSuccessMessage(this.responseMessages.createdSuccessfully);
    }

    @Put("")
    @ApiOkResponse({ type: PlaceholderResponseType })
    @ApiBody({ type: UpdatePlaceholderDto })
    async update(
        @AjvBody(updatePlaceholderSchema) { _id, ...dto }: UpdatePlaceholderDto
    ) {
        return CustomResponse
            .fromResult(
                await this.placeholdersCrudUseCases.updateOne(
                    _id,
                    dto,
                    null,
                    { or: ["name", "placeholder"] }
                )
            )
            .withSuccessMessage(this.responseMessages.updatedSuccessfully);
    }

    @Delete("")
    @ApiBody({ type: IdDto })
    async delete(
        @AjvBody(idDtoSchema) dto: IdDto
    ) {
        return CustomResponse
            .fromResult(
                await this.placeholdersCrudUseCases.deleteById(dto.id)
            )
            .withSuccessMessage(this.responseMessages.deletedSuccessfully);
    }

    @Get("")
    @ApiOkResponse({ type: PlaceholdersResponseType })
    async getAll() {
        return CustomResponse.fromResult(
            await this.placeholdersCrudUseCases.find()
        );
    }
}