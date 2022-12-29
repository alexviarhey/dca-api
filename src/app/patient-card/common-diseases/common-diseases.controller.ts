import { Controller, Param, Put } from "@nestjs/common";
import { AjvBody } from "../../common/decorators/ajv.decorators";
import { commonDiseasesAjvSchema, UpdateCommonDiseasesDto } from "./dto";
import { CommonDiseasesService } from "./common-diseases.service";
import { CustomResponse } from "../../../core/custom-response";


@Controller("/card/:id/common-diseases")
export class CommonDiseasesController {

    constructor(
        private commonDiseasesService: CommonDiseasesService
    ) {}

    @Put("")
    async update(
        @AjvBody(commonDiseasesAjvSchema) dto: UpdateCommonDiseasesDto,
        @Param("id") cardId: string
    ) {
        return CustomResponse
            .fromResult(
                await this.commonDiseasesService.updateCommonDiseases(cardId, dto)
            )
    }
}