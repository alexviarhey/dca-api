import { BaseRepository } from "./base.repository";

export abstract class CrudUseCases<T, Dto> {

  private constructor(
    private readonly repository: BaseRepository<T>,
    private readonly mapper: IMapper<T, Dto>
  ) {
  }

  async findOne(id: string) {
    try {
      return this.mapper.map(
        await this.repository.findById(id)
      );
    } catch (e) {
      console.log(e);
    }
  }

  async find() {
    try {
    } catch (e) {
      console.log(e);
    }
  }
}


