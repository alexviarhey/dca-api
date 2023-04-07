import { Result } from "./result";

type LogErrorInfo = {
    source?: string,
    method?: string,
    error: Error
}

export class ErrorLogger {
    constructor(private source: string) { }

    public logError({
        method,
        error
    }: LogErrorInfo) {
        console.log(`[${this.source} ${method} error]: `, error);
    };

    public logErrorAndReturnSomethingWentWrongResult(errorInfo: LogErrorInfo): Result {
        this.logError(errorInfo)
        return Result.somethingWentWrong();
    }
}
