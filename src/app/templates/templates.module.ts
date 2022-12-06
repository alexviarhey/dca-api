import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { templateSchema, TEMPLATES_COLLECTION } from "./schemas/template.schema";


@Module({
    imports: [
         MongooseModule.forFeature([
             { schema: templateSchema, name: TEMPLATES_COLLECTION }
         ])
    ],
    providers: [],
    exports: []
})

export class TemplatesModule{}