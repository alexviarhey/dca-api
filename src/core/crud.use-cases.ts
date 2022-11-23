import { Result } from "./result";
import { FilterQuery, HydratedDocument, Model, ProjectionType, SaveOptions, SortOrder, UpdateQuery } from "mongoose";
import { Paginated, Pagination } from "./paginated";
import { Mapper } from "./mapper";
import { IPatientSchema } from "../app/patients/schemas/patient.schema";


export abstract class CrudUseCases<T, CreateDto, Dto> {
    protected constructor(
        private readonly model: Model<T>,
        private readonly mapper: Mapper<T, Dto, CreateDto>,
        private modelName: string
    ) {
    }

    async create(
        dto: CreateDto,
        uniqueFields?: Array<keyof CreateDto>,
        filterQuery?: FilterQuery<T>,
        options?: SaveOptions
    ): Promise<Result<Dto>> {
        try {

            let filter: FilterQuery<T> = {};

            if (filterQuery) filter = filterQuery;

            if (!filterQuery && uniqueFields) {
                filter.$or = uniqueFields.map(f => ({
                    [f]: dto[f]
                } as FilterQuery<CreateDto>));
            }

            const existedItem = await this.model.findOne(filter);

            if (existedItem) {
                return Result.err(`${this.modelName} c одним из переданных параметров уже сущеуствует!`);
            }

            const schema = this.mapper.mapToSchema(dto);

            const item: any = await this.model.create([schema], options);

            console.log("ITEM: ", item)

            return Result.ok(
                this.mapper.map(item as HydratedDocument<T>)
            );
        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("create", e);
        }
    }

    async findOne(filterQuery: FilterQuery<T>): Promise<Result<Dto | null>> {
        try {
            return await this.model.findOne(filterQuery);
        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("findOne", e);
        }

    }

    async updateOne(
        id: string,
        dto?: Partial<CreateDto>,
        update?: UpdateQuery<T>
    ): Promise<Result<Dto>> {
        try {
            let updateQuery: UpdateQuery<T>;

            if (dto) {
                updateQuery = Object
                    .keys(dto)
                    .reduce<UpdateQuery<IPatientSchema>>((updateQuery, k) => {
                        updateQuery.$set = { [k]: dto[k] };
                        return updateQuery;
                    }, {});
            }

            if(update) {
                updateQuery = update
            }

            const updatedItem = await this.model.findOneAndUpdate(
                { _id: id },
                updateQuery || {},
                { new: true }
            );

            if (!updatedItem) {
                return Result.err(`${this.modelName} с id ${id} не найден!`);
            }

            return Result.ok(this.mapper.map(updatedItem));

        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("update", e);
        }
    }

    async deleteById(id: string): Promise<Result> {
        try {

            await this.model.deleteOne({
                _id: id
            });

            return Result.ok();

        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("create", e);
        }
    }

    async findById(id: string): Promise<Result<Dto>> {
        try {
            const item = await this.model.findById(id);

            if (item) return Result.ok(
                await this.mapper.map(item)
            );

            return Result.err(`${this.modelName} с id ${id} не найден!`);

        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("findById", e);
        }
    }

    async findWithPagination(
        filters: FilterQuery<T>,
        pagination: Pagination,
        sort?: { [key in keyof T]: SortOrder },
        projection?: ProjectionType<T>
    ) {
        try {
            const items = await this.model
                .find(
                    filters,
                    projection
                )
                .sort(sort)
                .skip(pagination.skip)
                .limit(pagination.limit);

            const count = await this.model.count(filters);

            return Result.ok(
                Paginated.new({
                    items: this.mapper.mapArray(items),
                    page: pagination.page,
                    size: pagination.size,
                    count
                })
            );
        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("findWithPagination", e);
        }
    }

    async find(
        filters?: FilterQuery<T>,
        pagination?: Pagination,
        sort?: { [key in keyof T]: SortOrder },
        projection?: ProjectionType<T>
    ): Promise<Result<Dto[]>> {
        try {

            const items = await this.model
                .find(
                    filters,
                    projection
                )
                .sort(sort);

            return Result.ok(this.mapper.mapArray(items));

        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("find", e);
        }
    }

    private static logErrorsAndReturnResult(method: string, err: any): Result {
        console.log(`[CrudUseCase ${method} error]: `, err);
        return Result.somethingWentWrong();
    }

}


