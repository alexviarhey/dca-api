import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ICDController } from "./icd.controller";
import { ICDCrudUseCase } from "./icd.crud-use-case";
import { ICD_COLLECTION, icdSchema } from "./icd.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ICD_COLLECTION, schema: icdSchema }
        ])
    ],
    providers: [ICDCrudUseCase],
    controllers: [ICDController],
    exports: [ICDCrudUseCase]
})
export class ICDModule {}