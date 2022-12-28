import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { templateSchema, TEMPLATES_COLLECTION } from "./schemas/template.schema";
import { TemplatesMapper } from "./mappers/templates.mapper";
import { TemplatesCrudUseCases } from "./use-cases/templates.crud-use-cases";
import { TemplatesController } from "./controllers/templates.controller";


@Module({
    imports: [
         MongooseModule.forFeature([
             { schema: templateSchema, name: TEMPLATES_COLLECTION }
         ])
    ],
    providers: [
        TemplatesMapper,
        TemplatesCrudUseCases
    ],
    controllers: [
        TemplatesController
    ],
    exports: []
})

export class TemplatesModule{}