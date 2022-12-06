import { Controller, Get } from "@nestjs/common";
import { FilterQuery } from "mongoose";
import { ICDCrudUseCase } from "./icd.crud-use-case";
import { ICDSchema } from "./icd.schema";
import { GetICDFilters, getICDFiltersSchema, ICDDto } from "./icd.dto";
import { AjvQuery } from "../common/decorators/ajv.decorators";
import { CustomResponse, CustomResponseType } from "../../core/custom-response";
import { ApiOkResponse, ApiProperty, ApiQuery, ApiTags } from "@nestjs/swagger";

class GetICDResponseType extends CustomResponseType<ICDDto[]> {
    @ApiProperty({ type: ICDDto, isArray: true })
    data: ICDDto[];
}


@Controller("/icd")
@ApiTags("ICD")

export class ICDController {

    constructor(
        private readonly icdCrudUseCase: ICDCrudUseCase,
    ) {}

    @Get("")
    @ApiOkResponse({type: GetICDResponseType})
    @ApiQuery({type: GetICDFilters})
    async getItems(
            @AjvQuery(getICDFiltersSchema) filters: GetICDFilters
    ) {
        let filterQuery: FilterQuery<ICDSchema> = {}

        if(filters.code) filterQuery.code = filters.code
        if(filters.name) filterQuery.name = { $regex: filters.name }

        const res = await this.icdCrudUseCase.find(filterQuery)

        return CustomResponse.fromResult(res)
    }
}