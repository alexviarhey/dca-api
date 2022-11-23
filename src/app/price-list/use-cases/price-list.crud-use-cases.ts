import { CrudUseCases } from "../../../core/crud.use-cases";
import { Injectable } from "@nestjs/common";
import { IPriceItemSchema, PRICE_ITEMS } from "../schemas/price-item.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { FilterQuery, Model } from "mongoose";
import { IServiceSubgroup, SERVICE_SUBGROUPS } from "../schemas/service-subgroup.schema";
import { IServiceGroup, SERVICE_GROUPS } from "../schemas/service-group.schema";
import {
    CreatePriceItemDto, CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    PriceItemDto,
    ServiceGroupDto,
    ServiceSubgroupDto,
    UpdatePriceItemDto
} from "../dto/price-list.dtos";
import {
    priceItemMapper,
    serviceGroupMapper,
    serviceSubgroupMapper
} from "../mappers/price-list.mappers";
import { Result } from "src/core/result";


@Injectable()
export class PriceItemsCrudUseCase extends CrudUseCases<IPriceItemSchema, CreatePriceItemDto, PriceItemDto> {
    constructor(
        @InjectModel(PRICE_ITEMS)
            priceItemModel: Model<IPriceItemSchema>
    ) {
        super(
            priceItemModel,
            priceItemMapper,
            "Элемент прайс листа"
        );
    }

    async update({ _id, ...dto }: UpdatePriceItemDto): Promise<Result<PriceItemDto>> {

        const filterQuery: FilterQuery<IPriceItemSchema> = { $or: [] };

        if (dto.itemNumber) {
            filterQuery.$or.push({ itemNumber: dto.itemNumber });
        }

        if (dto.name) {
            filterQuery.$or.push({ name: dto.name });
        }

        const existItemWithNewProps = await super.findOne(filterQuery);

        if (existItemWithNewProps) {
            return Result.err("Такой элемент прайс листа уже сущесутвует!");
        }

        return super.updateOne(_id, dto);
    }
}

@Injectable()
export class ServiceSubgroupCrudUseCase extends CrudUseCases<IServiceSubgroup, CreateServiceSubgroupDto, ServiceSubgroupDto> {
    constructor(
        @InjectModel(SERVICE_SUBGROUPS)
        private readonly serviceSubgroupModel: Model<IServiceSubgroup>,
        @InjectModel(SERVICE_GROUPS)
        private readonly serviceGroupModel: Model<IServiceGroup>,
        @InjectConnection()
        private readonly connection: mongoose.Connection
    ) {
        super(
            serviceSubgroupModel,
            serviceSubgroupMapper,
            "Подгруппа"
        );
    }

    async create(dto: CreateServiceSubgroupDto): Promise<Result<ServiceSubgroupDto>> {
        const session = await this.connection.startSession();
        session.startTransaction();

        let res: Result<ServiceSubgroupDto>;

        try {
            res = await super.create(
                dto,
                ["subgroupNumber", "name"],
                null,
                { session }
            );

            if (!res.isSuccess) throw new Error();

            if (dto.groupId) {
                let group = await this.serviceGroupModel.findOneAndUpdate(
                    { _id: dto.groupId },
                    { $push: { subgroupsIds: res.data._id } },
                    { session }
                );
                if (!group) {
                    res = Result.err("Группа не найдена!");
                    throw new Error();
                }
            }

            await session.commitTransaction();
        } catch (e) {
            console.log("ServiceSubgroupCrudUseCase error: ", e);
            await session.abortTransaction();
            return res || Result.somethingWentWrong();
        } finally {
            await session.endSession();
        }
    }
}

@Injectable()
export class ServiceGroupCrudUseCase extends CrudUseCases <IServiceGroup, CreateServiceGroupDto, ServiceGroupDto> {
    constructor(
        @InjectModel(SERVICE_GROUPS) serviceGroupModel: Model<IServiceGroup>
    ) {
        super(
            serviceGroupModel,
            serviceGroupMapper,
            "Группа"
        );
    }
}

