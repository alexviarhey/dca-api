import { FilterQuery, HydratedDocument, Model, ProjectionType } from "mongoose";

export abstract class BaseRepository<T> {

  private constructor(
    private readonly model: Model<T>
  ) {
  }

  async findById(id: string): Promise<HydratedDocument<T> | null> {
    try {
      return await this.model.findById(id);
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>
  ): Promise<HydratedDocument<T> | null> {
    try {
      return await this.model.findOne(filter, projection);
    } catch (e) {
      console.log(e);
    }
  }

  async find(
    filter: FilterQuery<T>,
    projection?: ProjectionType<T>,
    skip?: number,
    limit?: number
  ): Promise<HydratedDocument<T>[]> {
    try {

      if(skip !== undefined && limit !== undefined) {
        return this.model
          .find(filter, projection)
          .skip(skip)
          .limit(limit)
      }

      return this.model.find(filter, projection)

    } catch (e) {
      console.log(e);
    }
  }

  async create(model: T): Promise<HydratedDocument<T>> {
    try {
      return await this.model.create(model);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.model.deleteOne({ id });
    } catch (e) {
      console.log(e);
    }
  }

  async deleteOne(filters: FilterQuery<T>): Promise<void> {
    try {
      await this.model.deleteOne(filters);
    } catch (e) {
      console.log(e);
    }
  }
}