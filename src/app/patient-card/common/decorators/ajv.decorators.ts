import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { AnySchema } from "ajv";
import ajvKeywords from "ajv-keywords";
import addFormats from "ajv-formats";
import { AjvBuilder } from "../../../../core/ajv.builder";
import { AjvException } from "../exeption-filters";

const ajv = AjvBuilder
    .new()
    .withOptions({ coerceTypes: true })
    .bindPlugins(ajvKeywords, addFormats)
    .build();

const isValid = (
    schema: AnySchema,
    data: any
) => {
    if (!ajv.validate(schema, data)) {
        console.log("ERRORS", JSON.stringify(ajv.errors))
        throw new AjvException(ajv.errors);
    }
};


export const AjvBody = createParamDecorator((schema: AnySchema, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const body = request.body;

    isValid(schema, body);

    return body;
});

export const AjvQuery = createParamDecorator((schema: AnySchema, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const query = request.query;

    isValid(schema, query);

    return query;
});

export const AjvParams = createParamDecorator((schema: AnySchema, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();

    const params = request.params;

    isValid(schema, params);

    return params;
});
