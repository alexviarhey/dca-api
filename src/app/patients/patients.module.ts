import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PATIENTS, patientSchema } from "./schemas/patient.schema";
import { PatientsCrudUseCases } from "./use-cases/patients.crud-use-cases";
import { PatientsController } from "./controllers/patients.controller";
import { PatientCardModule } from "../patient-card/patient-card.module";
import { GetPatientCardsUserCase } from "./use-cases/get-patient-cards.use-case";
import { PATIENTS_CARDS_COLLECTION, patientCardSchema } from "../patient-card/schemas/patientCard.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PATIENTS, schema: patientSchema },
            { name: PATIENTS_CARDS_COLLECTION, schema: patientCardSchema },
        ]),
        PatientCardModule
    ],
    providers: [
        PatientsCrudUseCases,
        GetPatientCardsUserCase
    ],
    controllers: [
        PatientsController
    ],
    exports: [
        PatientsCrudUseCases
    ]
})
export class PatientsModule { }
