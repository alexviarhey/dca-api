import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post
} from "@nestjs/common";
import {
    PriceItemsCrudUseCase,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase
} from "../use-cases/price-list.crud-use-cases";
import { CustomResponse } from "../../core/custom-response";
import { CreatePriceItemDto, CreateServiceGroupDto, CreateServiceSubgroupDto } from "../dto/price-list.dtos";
import { GetPriceListUseCase } from "../use-cases/get-price-list.use-case";

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
    async getPriceList() {
        const res = await this.getPriseListUseCase.execute(
            this.priceItemsCrudUseCase,
            this.serviceSubgroupUseCase,
            this.serviceGroupUseCase
        );

        return CustomResponse.fromResult(res);
    }

    @Post("/item")
    async createPriceItem(
        @Body() createDto: CreatePriceItemDto
    ) {

        const res = await this.priceItemsCrudUseCase.create(
            createDto,
            ["name", "itemNumber"]
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Элемент прайс-листа успешно создан!");
    }

    @Post("/subgroup")
    async createSubgroup(
        @Body() createDto: CreateServiceSubgroupDto
    ) {

        const res = await this.serviceSubgroupUseCase.create(
            createDto,
            ["name", "subgroupNumber"]
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Подгруппа успешно создана!");
    }

    @Post("/group")
    async createGroup(
        @Body() createDto: CreateServiceGroupDto
    ) {
        const res = await this.serviceGroupUseCase.create(
            createDto,
            ["name", "groupNumber"]
        );

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Группа успешно создана!");
    }

    @Delete("/item/:id")
    async deletePriceItem(
        @Param("id") id: string
    ) {
        const res = await this.priceItemsCrudUseCase.deleteById(id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Элемент прайс-листа успешно удален!");
    }

    @Delete("/subgroup/:id")
    async deleteSubgroup(
        @Param("id") id: string
    ) {

        const res = await this.serviceSubgroupUseCase.deleteById(id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Подгруппа успешно удалена!");
    }

    @Delete("/group")
    async deleteGroup(
        @Param("id") id: string
    ) {
        const res = await this.serviceGroupUseCase.deleteById(id);

        return CustomResponse
            .fromResult(res)
            .withSuccessMessage("Группа успешно удалена!");
    }
}
