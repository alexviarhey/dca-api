import { Result } from "./result";
import { AnyKeys, FilterQuery, Model, ProjectionType, SaveOptions, SortOrder, UpdateQuery } from "mongoose";
import { Paginated, Pagination } from "./paginated";
import { Mapper } from "./mapper";
import { DeleteResult } from "mongodb";
import { or } from "ajv/dist/compile/codegen";

type UniqueFields<T> = {
    and?: Array<keyof T>,
    or?: Array<keyof T>
}

export abstract class CrudUseCases<T, CreateDto, Dto> {

    protected constructor(
        private readonly model: Model<T>,
        private readonly mapper: Mapper<T, Dto, CreateDto>,
        private modelName: string
    ) {
    }

    async create(
        dto: CreateDto,
        filterQuery?: FilterQuery<T>,
        uniqueFields?: UniqueFields<T>,
        options?: SaveOptions
    ): Promise<Result<Dto>> {
        try {
            const schema = this.mapper.mapToSchema(dto);

            if (filterQuery || uniqueFields) {
                const res = await this.checkUniqueness(schema, uniqueFields, filterQuery);
                if (!res.isSuccess) return res;
            }

            //If option is used return type is Array<HydratedDoc<T>>
            const items = await this.model.create([schema], options);

            return Result.ok(
                this.mapper.map(items[0])
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
        dto: Partial<CreateDto>,
        filterQuery?: FilterQuery<T>,
        uniqueFields?: UniqueFields<T>
    ): Promise<Result<Dto>> {
        try {
            let partialSchema = this.mapper.mapToSchemaPartial(dto);

            if (filterQuery || uniqueFields) {
                const res = await this.checkUniqueness(partialSchema, uniqueFields, filterQuery);
                if (!res.isSuccess) return res;
            }

            let updateQuery: UpdateQuery<T> = Object
                .keys(partialSchema)
                .reduce((updateQuery, k) => {
                    updateQuery.$set[k] = partialSchema[k];
                    return updateQuery;
                }, { $set: {} });

            const updatedItem = await this.model.findOneAndUpdate(
                { _id: id },
                updateQuery,
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

    async deleteById(id: string): Promise<Result<DeleteResult>> {
        try {

            const res = await this.model.deleteOne({
                _id: id
            });

            return Result.ok(res);

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
        sort?: { [key in keyof T]?: SortOrder },
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

    public async checkUniqueness(
        schema: T | Partial<T>,
        uniqueFields?: { and?: Array<keyof T>, or?: Array<keyof T> },
        filterQuery?: FilterQuery<T>
    ): Promise<Result> {
        try {

            let filter: FilterQuery<T> = filterQuery;

            if (!filterQuery) {
                const isAndFieldsLength = uniqueFields?.and?.length;
                const isOrFieldsLength = uniqueFields?.or?.length;

                if (!isAndFieldsLength && !isOrFieldsLength) return;

                filter = {}

                if (isAndFieldsLength && !isOrFieldsLength) addAndFields();

                if (isOrFieldsLength && !isAndFieldsLength) addOrFields();

                if (isOrFieldsLength && isAndFieldsLength) combineOrWithAndFields()

                function addAndFields(andOperatorArray?) {
                    uniqueFields.and.forEach(f => {
                        if (!schema[f]) return;

                        if(!andOperatorArray) {
                            filter[f] = schema[f];
                        } else {
                            andOperatorArray.push({ [f]: schema[f] })
                        }
                    });
                }

                function addOrFields() {
                    uniqueFields.or.forEach(f => {
                        if (schema[f]) {
                            if (!filter.$or) filter.$or = [];
                            filter.$or.push({ [f]: schema[f] } as FilterQuery<T>);
                        }
                    });
                }

                function combineOrWithAndFields() {
                    addOrFields();

                    if(!filter.$or) {
                        addAndFields()
                    } else {
                        filter.$or.push({ $and: [] })
                        addAndFields(filter.$or[filter.$or.length - 1])
                    }
                }
            }

            if (filter && Object.keys(filter).length) {
                const exists = await this.findOne(filter);
                if (exists) return Result.err(`${this.modelName} c одним из переданных параметров уже существует!`);
            }

            return Result.ok();

        } catch (e) {
            return CrudUseCases.logErrorsAndReturnResult("checkUniqueness", e);
        }
    }

    private static logErrorsAndReturnResult(method: string, err: any): Result {
        console.log(`[CrudUseCase ${method} error]: `, err);
        return Result.somethingWentWrong();
    }

}


