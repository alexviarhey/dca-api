import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { CustomResponse } from "../../../core/custom-response";
import { Response } from "express";


export class AjvException extends HttpException {
    constructor(message: any) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

@Catch(AjvException)
export class AjvExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        let customResponse: CustomResponse;

        const ajvMessage: any = exception.getResponse()[0];

        if (ajvMessage) {
            customResponse = CustomResponse
                .validationError({
                    field: ajvMessage.instancePath?.slice(1),
                    message: ajvMessage.message
                })
                .withErrorMessage("Bad request!")
        } else {
            customResponse = CustomResponse.error({
                message: "Bad request!"
            });
        }

        res
            .status(HttpStatus.OK)
            .json(customResponse);
    }
}
