

export class Pagination {
  private constructor(
    readonly page: number,
    readonly size: number
  ) {
  }

  new(page: number = 0, size: number = 10): Pagination {
    return new Pagination(page, size);
  }

  public get skip(): number {
    return this.page * this.size
  }

  public get limit(): number {
    return this.size
  }
}


export class Paginated<T> {
  page: number;
  size: number;
  totalCount: number;
  pagesCount: number;
  items: T[];

  public static new<T>(data: { page: number, size: number, count: number, items: T[] }): Paginated<T> {
    const { page, size, count, items } = data;

    return {
      page,
      size,
      totalCount: count,
      pagesCount: Math.ceil(count / size),
      items
    };
  }

  public static getSkip(paginatin) {

  }
}
