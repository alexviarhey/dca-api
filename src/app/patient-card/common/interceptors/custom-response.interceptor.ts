import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map, tap } from "rxjs";
import { CustomResponse } from "../../../../core/custom-response";
import { Result } from "../../../../core/result";

@Injectable()
export class CustomResponseInterceptor<T> implements NestInterceptor<Result<T>, CustomResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<Result<T>>): Observable<CustomResponse<T>> {
        return next
            .handle()
            .pipe(
                map(data => CustomResponse.fromResult(data))
            );
    }
}
