import {
    Controller,
    Get,
    Post
} from "@nestjs/common";
import {
    PriceItemsCrudUseCase,
    ServiceGroupCrudUseCase,
    ServiceSubgroupCrudUseCase
} from "../use-cases/price-list.crud-use-cases";
import { CustomResponse, CustomResponseType } from "../../core/custom-response";
import {
    createGroupSchema,
    CreatePriceItemDto,
    createPriceItemSchema,
    CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    createSubgroupSchema,
    PriceItemDto,
    ServiceGroupDto,
    ServiceGroupWithSubgroupsDto,
    ServiceSubgroupDto
} from "../dto/price-list.dtos";
import { GetPriceListUseCase } from "../use-cases/get-price-list.use-case";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { ApiBody, ApiOkResponse, ApiProperty, ApiTags } from "@nestjs/swagger";

export class PriceListResponse extends CustomResponseType<ServiceGroupWithSubgroupsDto[]> {
    @ApiProperty({ type: ServiceGroupWithSubgroupsDto, isArray: true })
    data: ServiceGroupWithSubgroupsDto[];
}

export class CreatePriceItemResponse extends CustomResponseType<CreatePriceItemDto> {
    @ApiProperty({ type: CreatePriceItemDto })
    data: CreatePriceItemDto;
}

export class CreateSubgroupResponse extends CustomResponseType<ServiceSubgroupDto> {
    @ApiProperty({ type: ServiceSubgroupDto})
    data: ServiceSubgroupDto;
}

export class CreateGroupResponse extends CustomResponseType<ServiceGroupDto> {
    @ApiProperty({ type: ServiceGroupDto})
    data: ServiceGroupDto;
}


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
    @ApiOkResponse({ type: PriceListResponse})
    async getPriceList() {
        const res = await this.getPriseListUseCase.execute(
            this.priceItemsCrudUseCase,
            this.serviceSubgroupUseCase,
            this.serviceGroupUseCase
        );

        return CustomResponse.fromResult(res);
    }

    @Post("/item")
    @ApiBody({ type: CreatePriceItemDto })
    @ApiOkResponse({ type: CreatePriceItemResponse})
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

    @Post("/subgroup")
    @ApiBody({ type: CreateServiceSubgroupDto})
    @ApiOkResponse({ type: CreateSubgroupResponse})
    async createSubgroup(
        @AjvBody(createSubgroupSchema) createDto: CreateServiceSubgroupDto
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
    @ApiBody({ type: CreateServiceGroupDto})
    @ApiOkResponse({ type: CreateGroupResponse})
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

    //TODO update delete methods need to delete ids from arrays in groups and subgroups

    // @Delete("/item/:id")
    // async deletePriceItem(
    //     @Param("id") id: string
    // ) {
    //     const res = await this.priceItemsCrudUseCase.deleteById(id);
    //
    //     return CustomResponse
    //         .fromResult(res)
    //         .withSuccessMessage("Элемент прайс-листа успешно удален!");
    // }
    //
    // @Delete("/subgroup/:id")
    // async deleteSubgroup(
    //     @Param("id") id: string
    // ) {
    //
    //     const res = await this.serviceSubgroupUseCase.deleteById(id);
    //
    //     return CustomResponse
    //         .fromResult(res)
    //         .withSuccessMessage("Подгруппа успешно удалена!");
    // }
    //
    // @Delete("/group")
    // async deleteGroup(
    //     @Param("id") id: string
    // ) {
    //     const res = await this.serviceGroupUseCase.deleteById(id);
    //
    //     return CustomResponse
    //         .fromResult(res)
    //         .withSuccessMessage("Группа успешно удалена!");
    // }
}