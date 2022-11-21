import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PATIENTS, patientSchema } from "./schemas/patient.schema";
import { PatientsCrudUseCases } from "./use-cases/patients.crud-use-cases";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PATIENTS, schema: patientSchema },
        ])
    ],
    providers: [
        PatientsCrudUseCases
    ]
})
export class PatientsModule {}