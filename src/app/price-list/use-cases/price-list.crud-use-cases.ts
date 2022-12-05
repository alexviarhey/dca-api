import { CrudUseCases } from "../../../core/crud.use-cases";
import { Injectable } from "@nestjs/common";
import { IPriceItemSchema, PRICE_ITEMS } from "../schemas/price-item.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import mongoose, { ClientSession, Model } from "mongoose";
import { IServiceSubgroup, SERVICE_SUBGROUPS } from "../schemas/service-subgroup.schema";
import { IServiceGroup, SERVICE_GROUPS } from "../schemas/service-group.schema";
import {
    CreatePriceItemDto, CreateServiceGroupDto,
    CreateServiceSubgroupDto,
    PriceItemDto,
    ServiceGroupDto,
    ServiceSubgroupDto
} from "../dto/price-list.dtos";
import {
    priceItemMapper,
    serviceGroupMapper,
    serviceSubgroupMapper
} from "../mappers/price-list.mappers";
import { Result } from "src/core/result";
import { DeleteResult } from "mongodb";

@Injectable()
export class PriceItemsCrudUseCase extends CrudUseCases<IPriceItemSchema, CreatePriceItemDto, PriceItemDto> {
    constructor(
        @InjectModel(PRICE_ITEMS)
        private readonly priceItemModel: Model<IPriceItemSchema>,
        @InjectModel(SERVICE_SUBGROUPS)
        private readonly serviceSubgroupModel: Model<IServiceSubgroup>,
        @InjectConnection()
        private readonly connection: mongoose.Connection
    ) {
        super(
            priceItemModel,
            priceItemMapper,
            "Элемент прайс листа"
        );
    }

    async deleteOne(id: string): Promise<Result> {
        const session = await this.connection.startSession();

        return await deletePriceListChildElement<IServiceSubgroup>(
            session,
            super.deleteById.bind(this),
            this.serviceSubgroupModel,
            id,
            "priceItems"
        );
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
                { or: ["subgroupNumber", "name"] },
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

    async deleteOne(id: string): Promise<Result> {
        const session = await this.connection.startSession();

        return await deletePriceListChildElement<IServiceGroup>(
            session,
            super.deleteById.bind(this),
            this.serviceGroupModel,
            id,
            "subgroupsIds"
        );
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

//Need for delete priceItem or subgroup
const deletePriceListChildElement = async <ParentModel>(
    session: ClientSession,
    deleteById: (id: string) => Promise<Result<DeleteResult>>,
    parentModel: Model<ParentModel>,
    childId: string,
    childIdsFieldName: keyof ParentModel
): Promise<Result> => {
    session.startTransaction();

    try {
        //First delete child
        let res = await deleteById(childId);
        let isDeleteError = !res.isSuccess || !res.data.deletedCount;
        if (isDeleteError) throw new Error();

        //Second delete childId from parent childIds field
        const fieldObj = { [childIdsFieldName]: childId } as { [P in keyof ParentModel]: string };

        await parentModel.updateMany(
            fieldObj,
            { $pull: fieldObj }
        );

        await session.commitTransaction();

        return Result.ok();
    } catch (e) {
        console.log("DeletePriceListChildElement error: ", e);
        await session.abortTransaction();
        return Result.somethingWentWrong();
    } finally {
        await session.endSession();
    }
};


