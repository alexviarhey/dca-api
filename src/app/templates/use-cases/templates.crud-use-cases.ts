import { CrudUseCases } from "../../../core/crud.use-cases";
import { ITemplateSchema, TEMPLATES_COLLECTION } from "../schemas/template.schema";
import { CreateTemplateDto, TemplateDto } from "../dto/templates.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { TemplatesMapper } from "../mappers/templates.mapper";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TemplatesCrudUseCases extends CrudUseCases<ITemplateSchema, CreateTemplateDto, TemplateDto> {
    constructor(
        @InjectModel(TEMPLATES_COLLECTION)
        private readonly templateModel: Model<ITemplateSchema>,
        private readonly templatesMapper: TemplatesMapper
    ) {
        super(templateModel, templatesMapper, "Шаблон");
    }
}