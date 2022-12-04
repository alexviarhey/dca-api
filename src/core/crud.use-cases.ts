import { Result } from "./result";
import { FilterQuery, Model, ProjectionType, SaveOptions, SortOrder, UpdateQuery } from "mongoose";
import { Paginated, Pagination } from "./paginated";
import { Mapper } from "./mapper";
import { IPatientSchema } from "../app/patients/schemas/patient.schema";
import {DeleteResult} from 'mongodb'


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
                return Result.err(`${this.modelName} c одним из переданных параметров уже существует!`);
            }

            const schema = this.mapper.mapToSchema(dto);

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


    async patchUpdate(
        id: string,
        dto: Partial<CreateDto>,
        uniqueFields?: { and?: Array<keyof T>, or?: Array<keyof T> },
    ) {
       try {

           let partialSchema = this.mapper.mapToSchemaPartial(dto)

           let filterQuery: FilterQuery<T> = {}

           if(uniqueFields) {
               const andFields = uniqueFields.and
               const orFields = uniqueFields.or

               if(andFields && !orFields) {
                   andFields.forEach(f => {
                       if(partialSchema[f]) {
                           filterQuery[f] = partialSchema[f]
                       }
                   })
               }

               if(orFields && !andFields) {
                   filterQuery.$or = []

                   orFields.forEach(f => {
                       if(partialSchema[f]) {
                           filterQuery.$or.push({ [f]: partialSchema[f] })
                       }
                   })
               }
           }

       } catch(e) {
           return CrudUseCases.logErrorsAndReturnResult("patchUpdate", e);
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
                    //TODO FIX THAT I THINK NEED PARTIAL MAPPER TO SCHEMA
                    .reduce<UpdateQuery<any>>((updateQuery, k) => {
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

    async deleteById(id: string): Promise<Result<DeleteResult>> {
        try {

            const res =  await this.model.deleteOne({
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

    public isModelExist(

    ) {
        try {

        } catch(e) {
            return CrudUseCases.logErrorsAndReturnResult("isModelExist", e);
        }
    }

    private static logErrorsAndReturnResult(method: string, err: any): Result {
        console.log(`[CrudUseCase ${method} error]: `, err);
        return Result.somethingWentWrong();
    }

}


