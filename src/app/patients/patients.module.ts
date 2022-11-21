import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PATIENTS, patientSchema } from "./schemas/patient.schema";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PATIENTS, schema: patientSchema },
        ])
    ]
})
export class PatientsModule {}