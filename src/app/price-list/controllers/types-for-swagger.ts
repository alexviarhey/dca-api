import { CustomResponseType } from "../../../core/custom-response";
import {
    CreatePriceItemDto, PriceItemDto,
    ServiceGroupDto,
    ServiceGroupWithSubgroupsDto,
    ServiceSubgroupDto
} from "../dto/price-list.dtos";
import { ApiProperty } from "@nestjs/swagger";

export class PriceListResponse extends CustomResponseType<ServiceGroupWithSubgroupsDto[]> {
    @ApiProperty({ type: ServiceGroupWithSubgroupsDto, isArray: true })
    data: ServiceGroupWithSubgroupsDto[];
}

export class CreatePriceItemResponse extends CustomResponseType<CreatePriceItemDto> {
    @ApiProperty({ type: CreatePriceItemDto })
    data: CreatePriceItemDto;
}

export class CreateSubgroupResponse extends CustomResponseType<ServiceSubgroupDto> {
    @ApiProperty({ type: ServiceSubgroupDto })
    data: ServiceSubgroupDto;
}

export class CreateGroupResponse extends CustomResponseType<ServiceGroupDto> {
    @ApiProperty({ type: ServiceGroupDto })
    data: ServiceGroupDto;
}


export class GetPriceItemsResponse extends CustomResponseType<PriceItemDto[]> {
    @ApiProperty({ type: PriceItemDto, isArray: true})
    data: PriceItemDto[]
}

