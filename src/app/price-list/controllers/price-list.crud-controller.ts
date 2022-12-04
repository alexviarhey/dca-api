import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put
} from "@nestjs/common";
import {
    PriceItemsCrudUseCase,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase
} from "../use-cases/price-list.crud-use-cases";
import { CustomResponse, CustomResponseType } from "../../../core/custom-response";
import {
    createGroupSchema,
    CreatePriceItemDto,
    createPriceItemSchema,
    CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    createSubgroupSchema, UpdateGroupDto,
    UpdatePriceItemDto,
    updatePriceItemShema
} from "../dto/price-list.dtos";
import { GetPriceListUseCase } from "../use-cases/get-price-list.use-case";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
    CreateGroupResponse,
    CreatePriceItemResponse,
    CreateSubgroupResponse, GetGroupsResponse, GetPriceItemsResponse, GetSubgroupsResponse,
    PriceListResponse
} from "./types-for-swagger";
import { IdDto } from "../../common/dto/id.dto";


@ApiTags("Price List")
@Controller("/price-list")
export class PriceListCrudController {
    constructor(
        private readonly priceItemsCrudUseCase: PriceItemsCrudUseCase,
        private readonly serviceSubgroupUseCase: ServiceSubgroupCrudUseCase,
        private readonly serviceGroupUseCase: ServiceGroupCrudUseCase,
        private readonly getPriseListUseCase: GetPriceListUseCase
    ) {
    }

    @Get()
    @ApiOkResponse({ type: PriceListResponse })
    async getPriceList() {
        const res = await this.getPriseListUseCase.execute(
            this.priceItemsCrudUseCase,
            this.serviceSubgroupUseCase,
            this.serviceGroupUseCase
        );

        return CustomResponse.fromResult(res);
    }

    @Post("/items")
    @ApiBody({ type: CreatePriceItemDto })
    @ApiOkResponse({ type: CreatePriceItemResponse })
    async createPriceItem(
        @AjvBody(createPriceItemSchema) createDto: CreatePriceItemDto
    ) {
        const res = await this.priceItemsCrudUseCase.create(
            createDto,
            ["name", "itemNumber"]
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Элемент прайс-листа успешно создан!");
    }


    @Get("/items")
    @ApiOkResponse({ type: GetPriceItemsResponse })
    async getPriceItems() {
        const res = await this.priceItemsCrudUseCase.find(
            {},
            { itemNumber: 'ascending' }
        );
        return CustomResponse.fromResult(res);
    }

    @Post("/subgroups")
    @ApiBody({ type: CreateServiceSubgroupDto })
    @ApiOkResponse({ type: CreateSubgroupResponse })
    async createSubgroup(
        @AjvBody(createSubgroupSchema) createDto: CreateServiceSubgroupDto
    ) {
        const res = await this.serviceSubgroupUseCase.create(createDto);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Подгруппа успешно создана!");
    }

    @Get("/subgroups")
    @ApiOkResponse({ type: GetSubgroupsResponse })
    async getSubgroups() {
        const res = await this.serviceSubgroupUseCase.find(
            {},
            { subgroupNumber: 'ascending' }
        );
        return CustomResponse.fromResult(res);
    }

    @Post("/groups")
    @ApiBody({ type: CreateServiceGroupDto })
    @ApiOkResponse({ type: CreateGroupResponse })
    async createGroup(
        @AjvBody(createGroupSchema) createDto: CreateServiceGroupDto
    ) {
        const res = await this.serviceGroupUseCase.create(
            createDto,
            ["name", "groupNumber"]
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Группа успешно создана!");
    }

    @Put("/groups")
    async udpateGroup(
        @AjvBody() dto: UpdateGroupDto
    ) {
        const res = await this.serviceGroupUseCase.update(dto)

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Группа успешно обновлена!");
    }


    @Get("/groups")
    @ApiOkResponse({ type: GetGroupsResponse })
    async getGroups() {
        const res = await this.serviceGroupUseCase.find(
            {},
            { groupNumber: 'ascending' }
        );
        return CustomResponse.fromResult(res);
    }

    @Put("/items")
    @ApiOkResponse({ type: CustomResponseType })
    @ApiBody({ type: UpdatePriceItemDto })
    async updatePriceItem(
        @AjvBody(updatePriceItemShema) dto: UpdatePriceItemDto
    ) {
        const res = await this.priceItemsCrudUseCase.update(dto);
        return CustomResponse.fromResult(res);
    }

    @Delete("/group")
    @ApiBody({ type: IdDto })
    @ApiOkResponse({ type: CustomResponseType })
    async deleteGroup(
        @Body() dto: IdDto
    ) {
        const res = await this.serviceGroupUseCase.deleteById(dto.id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Группа успешно удалена!");
    }

    @Delete("/subgroup")
    @ApiBody({ type: IdDto })
    @ApiOkResponse({ type: CustomResponseType })
    async deleteSubgroup(
        @Body() dto: IdDto
    ) {
        const res = await this.serviceSubgroupUseCase.deleteOne(dto.id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Подгруппа успешно удалена!");
    }

    @Delete("/item")
    @ApiBody({ type: IdDto })
    @ApiOkResponse({ type: CustomResponseType })
    async deletePriceItem(
        @Body() dto: IdDto
    ) {
        const res = await this.priceItemsCrudUseCase.deleteOne(dto.id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Элемент прайс-листа успешно удален!");
    }

}
