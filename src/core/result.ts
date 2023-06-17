export class Result<T = null> {

    private constructor(
        private readonly _isSuccess: boolean,
        private readonly _data?: T | null,
        private readonly _error?: string | null
    ) {
    }

    get data(): T {
        if (this._data === undefined) throw new Error("Result error: no data found!");
        return this._data;
    }

    get error(): string {
        if (!this._error) throw new Error("Does not extract data from Result!");
        return this._error;
    }

    public static ok<T>(data: T = null): Result<T> {
        return new Result<T>(true, data, null);
    }

    public static err<T>(error: string): Result<T> {
        return new Result<T>(false, null, error);
    }

    get isSuccess(): boolean {
        return this._isSuccess;
    }


    public static somethingWentWrong(): Result {
        return Result.err("Что-то пошло не так, попробуйте позже!");
    }

    public mapErr(): Result {
        return Result.err(this.error)
    }

}



export type PromiseResult<T = null> = Promise<Result<T>>
