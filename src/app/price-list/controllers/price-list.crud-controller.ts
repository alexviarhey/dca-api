import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post
} from "@nestjs/common";
import {
    CreatePriceItemDto,
    CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    PriceItemsCrudUseCase, PriceListDto,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase,
    ServiceSubgroupDto,
    ServiceSubgroupWithPriceItemsDto
} from "../use-cases/price-items.crud-use-case";
import { CustomResponse } from "../../core/custom-response";

@Controller("/price-list")
export class PriceListCrudController {
    constructor(
        private readonly priceItemsCrudUseCase: PriceItemsCrudUseCase,
        private readonly serviceSubgroupUseCase: ServiceSubgroupCrudUseCase,
        private readonly serviceGroupUseCase: ServiceGroupCrudUseCase
    ) {
    }

    private createMap<T extends { _id: string }>(items: T[]): Map<string, T> {
        return items.reduce((map, item) => {
            map.set(item._id, item);
            return map;
        }, new Map());
    };

    @Get()
    async getPriceList() {

        //TODO get subgroups and groups by ids, because we can have draft groups
        const groupsRes = await this.serviceGroupUseCase.find();
        if (!groupsRes.isSuccess) return CustomResponse.fromResult(groupsRes);

        const subgroupsRes = await this.serviceSubgroupUseCase.find();
        if (!subgroupsRes.isSuccess) return CustomResponse.fromResult(subgroupsRes);

        const priceItemsRes = await this.priceItemsCrudUseCase.find();
        if (!priceItemsRes.isSuccess) return CustomResponse.fromResult(priceItemsRes);

        const subgroupsMap = this.createMap(subgroupsRes.data);
        const priceItemsMap = this.createMap(priceItemsRes.data);

        const priceList: PriceListDto = groupsRes.data.map(g => {
            const subgroups = g.subgroupIds.map(id => subgroupsMap.get(id));

            const subgroupsWithPriceItems: ServiceSubgroupWithPriceItemsDto[] = subgroups.map(sg => {
                const priceItems = sg.priceItemsIds.map(id => priceItemsMap.get(id));
                return {
                    _id: sg._id,
                    subgroupNumber: sg.subgroupNumber,
                    name: sg.name,
                    priceItems
                };
            });

            return {
                _id: g._id,
                groupNumber: g.groupNumber,
                name: g.name,
                subgroups: subgroupsWithPriceItems
            };
        });

        return CustomResponse.success(priceList)
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
