import { Result } from "./result";


export const logErrorsAndReturnSomethingWentWrongResult = (
    source: string,
    method: string,
    err: any = "Что-то пошло не так!"
): Result => {
    console.log(`[${source} ${method} error]: `, err);
    return Result.somethingWentWrong();
};