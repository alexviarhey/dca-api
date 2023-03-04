import { ErrorLogger } from "./errors";


export class BaseService {
    protected errorLogger: ErrorLogger

    constructor(source: string) {
        this.errorLogger = new ErrorLogger(source)
    }
}
