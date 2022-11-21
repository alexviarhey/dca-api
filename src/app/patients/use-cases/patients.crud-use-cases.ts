import { CrudUseCases } from "../../core/crud.use-cases";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientSchema, PATIENTS } from "../schemas/patient.schema";
import { FilterQuery, Model } from "mongoose";
import { patientMapper } from "../mappers/patient.mapper";
import { CreatePatientDto, PatientDto } from "../dto/patient.dtos";
import { Result } from "../../core/result";
import { ContactPointSystem } from "../../common/schemas/contact-point.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PatientsCrudUseCases extends CrudUseCases<IPatientSchema,
    CreatePatientDto,
    PatientDto> {
    constructor(
        @InjectModel(PATIENTS)
            patientModel: Model<IPatientSchema>
    ) {
        super(
            patientModel,
            patientMapper,
            "Пациент"
        );
    }

    async create(dto: CreatePatientDto): Promise<Result<PatientDto>> {
        let filterQuery: FilterQuery<IPatientSchema>

        if(dto.telecom && dto.telecom.length) {
            const phone = dto.telecom.find(t => t.system === ContactPointSystem.PHONE)
            if(phone) {
                filterQuery = {
                    "telecom.value": phone.value
                }
            }
        }

        return super.create(
            dto,
            null,
            filterQuery
        );
    }

}