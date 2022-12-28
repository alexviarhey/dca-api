import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { templateSchema, TEMPLATES_COLLECTION } from "./schemas/template.schema";
import { TemplatesMapper } from "./mappers/templates.mapper";


@Module({
    imports: [
         MongooseModule.forFeature([
             { schema: templateSchema, name: TEMPLATES_COLLECTION }
         ])
    ],
    providers: [
        TemplatesMapper
    ],
    exports: []
})

export class TemplatesModule{}