import { CrudUseCases } from "../../../core/crud.use-cases";
import { InjectModel } from "@nestjs/mongoose";
import { IPatientSchema, PATIENTS } from "../schemas/patient.schema";
import { FilterQuery, Model, SaveOptions } from "mongoose";
import { patientMapper } from "../mappers/patient.mapper";
import { CreatePatientDto, PatientDto } from "../dto/patient.dtos";
import { Result } from "../../../core/result";
import { ContactPointSystem } from "../../common/schemas/contact-point.schema";
import { Injectable } from "@nestjs/common";
import { Paginated, Pagination } from "../../../core/paginated";
import { GetPatientsFilters } from "../dto/get-patients-filters";
import { CreateCardUseCase } from "../../patient-card/use-cases/create-card.use-case";

@Injectable()
export class PatientsCrudUseCases extends CrudUseCases<IPatientSchema,
    CreatePatientDto,
    PatientDto> {
    constructor(
        @InjectModel(PATIENTS)
        patientModel: Model<IPatientSchema>,
        private readonly createCardUseCase: CreateCardUseCase
    ) {
        super(
            patientModel,
            patientMapper,
            "Пациент"
        );
    }

    async create(
        dto: CreatePatientDto,
        filterQuery?: FilterQuery<IPatientSchema>,
        uniqueFields?: { and?: (keyof IPatientSchema)[]; or?: (keyof IPatientSchema)[]; },
        options?: SaveOptions
    ): Promise<Result<PatientDto>> {
        const res = await super.create(dto, filterQuery, uniqueFields, options)

        if (res.isSuccess) {
            await this.createCardUseCase.execute(res.data._id)
        }

        return res
    }

    async findWithPagination(filters: GetPatientsFilters): Promise<Result<Paginated<PatientDto>>> {
        const paginated = Pagination.new({ page: filters.page, size: filters.size });

        const filterQuery: FilterQuery<IPatientSchema> = {};

        if (filters.active !== undefined) {
            filterQuery.active = filters.active
        } else {
            filterQuery.active = true
        }

        if (filters.gender) filterQuery.gender = filters.gender;

        if (filters.name) filterQuery["name.text"] = { $regex: filters.name };

        if (filters.address) filterQuery["address.text"] = { $regex: filters.address };

        if (filters.phone) {
            filterQuery.telecom = {
                $elemMatch: {
                    use: ContactPointSystem.PHONE,
                    value: { $regex: filters.phone }
                }
            };
        }

        return super.findWithPagination(filterQuery, paginated);
    }

    async inactivatePatient(_id: string): Promise<Result<PatientDto>> {
        return super.updateOne(_id, { active: false })
    }

    public getFiltersForUniqueness(dto: Partial<CreatePatientDto>): FilterQuery<IPatientSchema> | null {
        let filterQuery: FilterQuery<IPatientSchema> = null

        if (dto.telecom && dto.telecom.length) {
            const phone = dto.telecom.find(t => t.system === ContactPointSystem.PHONE);
            if (phone && dto.name) {
                filterQuery = {
                    name: dto.name,
                    "telecom.value": phone.value
                };
            }
        }

        return filterQuery
    }
}
