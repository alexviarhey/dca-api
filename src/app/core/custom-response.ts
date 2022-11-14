import { Result } from "./result";

export type CustomResponseMessage = { message: string }

export enum ResultCode {
    OK = 0,
    ERROR = 1
}

export class CustomResponse<T = null> {

    private constructor(
        private resultCode: ResultCode,
        private data?: T | null,
        private messages: Array<CustomResponseMessage> = [],
    ) {
    }


    public static fromResult<T>(result: Result<T>): CustomResponse<T> {
        if (result.isSuccess) {
            return new CustomResponse<T>(
                ResultCode.OK,
                result.data
            )
        } else {
            return new CustomResponse<T>(
                ResultCode.ERROR,
                null,
                [{ message: result.error }]
            )
        }
    }

    public withSuccessMessage<T>(
        message: string
    ): this {

        if (this.resultCode === ResultCode.OK) {
            this.messages = [{ message }]
        }

        return this
    }

    public withErrorMessage<T>(
        message: string
    ): this {

        if (this.resultCode === ResultCode.ERROR) {
            this.messages = [{ message }]
        }

        return this
    }

    public static success<T = null>(data: T): CustomResponse<T> {
        return new CustomResponse<T>(
            ResultCode.OK,
            data,
        )
    }
}
