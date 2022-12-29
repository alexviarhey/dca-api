import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { templateSchema, TEMPLATES_COLLECTION } from "./schemas/template.schema";
import { TemplatesMapper } from "./mappers/templates.mapper";
import { TemplatesCrudUseCases } from "./use-cases/templates.crud-use-cases";
import { TemplatesController } from "./controllers/templates.controller";
import { ICDModule } from "../icd/icd.module";
import { PriceListModule } from "../price-list/price-list.module";
import { templatePlaceholderSchema, TEMPLATES_PLACEHOLDERS_COLLECTION } from "./schemas/placeholder";
import { PlaceholdersMapper } from "./mappers/placeholdres.mapper";
import { PlaceholdersCrudUseCases } from "./use-cases/placeholders.crud-use-cases";
import { PlaceholdersController } from "./controllers/placeholders.controller";

@Module({
    imports: [
        MongooseModule.forFeature([
            { schema: templateSchema, name: TEMPLATES_COLLECTION },
            { schema: templatePlaceholderSchema, name: TEMPLATES_PLACEHOLDERS_COLLECTION }
        ]),
        ICDModule,
        PriceListModule
    ],
    providers: [
        TemplatesMapper,
        TemplatesCrudUseCases,
        PlaceholdersMapper,
        PlaceholdersCrudUseCases
    ],
    controllers: [
        TemplatesController,
        PlaceholdersController
    ],
    exports: []
})

export class TemplatesModule {
}