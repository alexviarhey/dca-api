import { CrudUseCases } from "../../../core/crud.use-cases";
import { ITemplatePlaceholder, TEMPLATES_PLACEHOLDERS_COLLECTION } from "../schemas/placeholder";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PlaceholdersMapper } from "../mappers/placeholdres.mapper";
import { CreatePlaceholderDto, PlaceholderDto } from "../dto/placeholders.dto";
import { Injectable } from "@nestjs/common";


@Injectable()
export class PlaceholdersCrudUseCases extends CrudUseCases<ITemplatePlaceholder, CreatePlaceholderDto, PlaceholderDto> {
    constructor(
        @InjectModel(TEMPLATES_PLACEHOLDERS_COLLECTION)
        private placeholderModel: Model<ITemplatePlaceholder>,
        private placeholderMapper: PlaceholdersMapper
    ) {
        super(
            placeholderModel,
            placeholderMapper,
            'Плейсхолдер'
        );
    }
}