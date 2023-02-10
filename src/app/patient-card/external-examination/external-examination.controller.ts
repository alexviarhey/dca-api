import { Controller, Get, Param, Put } from "@nestjs/common";




@Controller("/card/:id/external-examination")
export class ExternalExaminationController {

    constructor() {}

    @Get()
    async getExternalExamination(
        @Param("id") cardId: string
    ) {
    }

    @Put()
    async updateExternalExaminaion() {
    }

}
