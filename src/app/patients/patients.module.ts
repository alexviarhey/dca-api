import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PATIENTS, patientSchema } from "./schemas/patient.schema";
import { PatientsCrudUseCases } from "./use-cases/patients.crud-use-cases";
import { PatientsController } from "./controllers/patients.controller";
import { PatientCardModule } from "../patient-card/patient-card.module";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PATIENTS, schema: patientSchema },
        ]),
        PatientCardModule
    ],
    providers: [
        PatientsCrudUseCases
    ],
    controllers: [
        PatientsController
    ],
    exports: [
        PatientsCrudUseCases
    ]
})
export class PatientsModule {}
