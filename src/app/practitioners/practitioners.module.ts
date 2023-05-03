import { Module } from "@nestjs/common";
import { PractitionersCrudUseCases } from "./use-cases/practitioners.crud.use-cases";
import { PractitionersMapper } from "./mappers/practitioner.mapper";
import { MongooseModule } from "@nestjs/mongoose";
import { PRACTITIONERS_COLLECTION, practitionerSchema } from "./schemas/practitioner.schema";
import { PractitionersController } from "./controllers/practitioners.controller";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PRACTITIONERS_COLLECTION, schema: practitionerSchema },
        ]),
    ],
    providers: [
        PractitionersCrudUseCases,
        PractitionersMapper
    ],
    controllers: [
        PractitionersController
    ]
})
export class PractitionersModule { }
