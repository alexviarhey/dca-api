import { ApiProperty } from "@nestjs/swagger";

export class PaginatedFilters {
    @ApiProperty()
    page: number

    @ApiProperty()
    size: number
}

export class Pagination {
    private constructor(
        readonly page: number,
        readonly size: number
    ) {
    }

    public static new(value?: { page?: number, size?: number }): Pagination {
        if(!value || value.page === undefined || value.size === undefined) {
           return this.default()
        }

        return new Pagination(value.page, value.size)
    }

    public static fromFilters<T extends PaginatedFilters>(filters: T): Pagination {
        return new Pagination(filters.page, filters.size);
    }

    public static default(): Pagination {
        return new Pagination(0, 10);
    }

    public get skip(): number {
        return this.page * this.size;
    }

    public get limit(): number {
        return this.size;
    }
}


export abstract class Paginated<T> {
    @ApiProperty()
    page: number;

    @ApiProperty()
    size: number;

    @ApiProperty()
    totalCount: number;

    @ApiProperty()
    pagesCount: number;

    abstract items: T[];

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

}
