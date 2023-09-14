import {
    Body,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    UseInterceptors
} from "@nestjs/common";
import {
    PriceItemsCrudUseCase,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase
} from "../use-cases/price-list.crud-use-cases";
import { CustomResponseType } from "../../../../core/custom-response";
import {
    createGroupSchema,
    CreatePriceItemDto,
    createPriceItemSchema,
    CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    createSubgroupSchema, UpdateGroupDto, updateGroupSchema,
    UpdatePriceItemDto,
    updatePriceItemSchema, UpdateServiceSubgroupDto, updateSubgroupSchema
} from "../dto/price-list.dtos";
import { GetPriceListUseCase } from "../use-cases/get-price-list.use-case";
import { AjvBody } from "../../../patient-card/common/decorators/ajv.decorators";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import {
    CreateGroupResponse,
    CreatePriceItemResponse,
    CreateSubgroupResponse, GetGroupsResponse, GetPriceItemsResponse, GetSubgroupsResponse,
    PriceListResponse
} from "./types-for-swagger";
import { IdDto } from "../../../patient-card/common/dto/id.dto";
import { CustomResponseInterceptor } from "../../../patient-card/common/interceptors/custom-response.interceptor";


@ApiTags("Price List")
@Controller("/price-list")
@UseInterceptors(CustomResponseInterceptor)
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
        return this.getPriseListUseCase.execute(this.priceItemsCrudUseCase, this.serviceSubgroupUseCase, this.serviceGroupUseCase)
    }

    @Post("/items")
    @ApiBody({ type: CreatePriceItemDto })
    @ApiOkResponse({ type: CreatePriceItemResponse })
    async createPriceItem(
        @AjvBody(createPriceItemSchema) createDto: CreatePriceItemDto
    ) {
        return this.priceItemsCrudUseCase.create(createDto, null, { or: ["name", "itemNumber"] })
    }


    @Get("/items")
    @ApiOkResponse({ type: GetPriceItemsResponse })
    async getPriceItems() {
        return this.priceItemsCrudUseCase.find({}, { itemNumber: "ascending" })
    }

    @Put("/items")
    @ApiOkResponse({ type: CustomResponseType })
    @ApiBody({ type: UpdatePriceItemDto })
    async updatePriceItem(
        @AjvBody(updatePriceItemSchema) { _id, ...updatePriceItemDto }: UpdatePriceItemDto
    ) {
        return this.priceItemsCrudUseCase.updateOne(_id, updatePriceItemDto, null, { or: ["itemNumber", "name"] })
    }

    @Delete("/items")
    @ApiBody({ type: IdDto })
    @ApiOkResponse({ type: CustomResponseType })
    async deletePriceItem(
        @Body() dto: IdDto
    ) {
        return this.priceItemsCrudUseCase.deleteOne(dto.id)
    }

    @Post("/subgroups")
    @ApiBody({ type: CreateServiceSubgroupDto })
    @ApiOkResponse({ type: CreateSubgroupResponse })
    async createSubgroup(
        @AjvBody(createSubgroupSchema) createDto: CreateServiceSubgroupDto
    ) {
        return this.serviceSubgroupUseCase.create(createDto)
    }

    @Get("/subgroups")
    @ApiOkResponse({ type: GetSubgroupsResponse })
    async getSubgroups() {
        return this.serviceSubgroupUseCase.find({}, { subgroupNumber: "ascending" })
    }

    @Put("/subgroups")
    async updateSubgroup(
        @AjvBody(updateSubgroupSchema) { _id, ...updateSubgroupDto }: UpdateServiceSubgroupDto
    ) {
        return this.serviceSubgroupUseCase.updateOne(_id, updateSubgroupDto, null, { or: ["subgroupNumber", "name"] })
    }

    @Delete("/subgroup")
    @ApiBody({ type: IdDto })
    @ApiOkResponse({ type: CustomResponseType })
    async deleteSubgroup(
        @Body() dto: IdDto
    ) {
        return this.serviceSubgroupUseCase.deleteOne(dto.id)
    }

    @Post("/groups")
    @ApiBody({ type: CreateServiceGroupDto })
    @ApiOkResponse({ type: CreateGroupResponse })
    async createGroup(
        @AjvBody(createGroupSchema) createDto: CreateServiceGroupDto
    ) {
        return this.serviceGroupUseCase.create(createDto, null, { or: ["name", "groupNumber"] })
    }

    @Put("/groups")
    async updateGroup(
        @AjvBody(updateGroupSchema) { _id, ...updateGroupDto }: UpdateGroupDto
    ) {
        return this.serviceGroupUseCase.updateOne(_id, updateGroupDto, null, { or: ["groupNumber", "name"] })
    }


    @Get("/groups")
    @ApiOkResponse({ type: GetGroupsResponse })
    async getGroups() {
        return this.serviceGroupUseCase.find({}, { groupNumber: "ascending" })
    }


    @Delete("/group")
    @ApiBody({ type: IdDto })
    @ApiOkResponse({ type: CustomResponseType })
    async deleteGroup(
        @Body() dto: IdDto
    ) {
        return this.serviceGroupUseCase.deleteById(dto.id)
    }
}
