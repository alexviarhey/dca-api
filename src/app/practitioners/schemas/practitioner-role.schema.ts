import { Result } from "../../../core/result"
import { PractitionerRoleDto } from "../dto/practitioner.role.dto"

export enum PractitionerCode {
    DOCTOR = 'doctor',
    NURSE = 'nurse',
    ADMINISTRATOR = 'administrator'
}

export type PractitionerRole = {
    code: PractitionerCode
    speciality: string | null
}

enum PractitionerRoleValidationResult {
    OK = 1,
    INVALID_CODE,
    INVALID_SPECIALITY,
}

abstract class PractitionerRoles {
    constructor(
        public readonly code: PractitionerCode,
        public readonly specialties: string[] | null = null
    ) { }

    public validateCodeAndSpeciality(code: PractitionerCode, speciality: string | null): PractitionerRoleValidationResult {
        if (code !== this.code) return PractitionerRoleValidationResult.INVALID_CODE
        if (!this.specialties.includes(speciality)) return PractitionerRoleValidationResult.INVALID_SPECIALITY
        return PractitionerRoleValidationResult.OK
    }

    public getCodeWithSpecialties() {
        return {
            code: this.code,
            specialties: this.specialties
        }
    }
}

export enum DoctorsSpecialties {
    SURGEON = 'surgeon',
    ORTHOPEDIST = 'orthopedist',
    ORTHODONTIST = 'orthodontist',
    THERAPIST = 'therapist'
}

class DoctorRole extends PractitionerRoles {
    constructor() {
        super(
            PractitionerCode.DOCTOR,
            Object.values(DoctorsSpecialties)
        )
    }
}

class NurseRole extends PractitionerRoles {
    constructor() {
        super(
            PractitionerCode.NURSE
        )
    }
}

class AdministratorRole extends PractitionerRoles {
    constructor() {
        super(
            PractitionerCode.ADMINISTRATOR
        )
    }
}

export class PractitionerRoleHelper {
    private constructor(
        private readonly roles: PractitionerRoles[]
    ) { }

    public validateListOfRoles(roles: Array<PractitionerRoleDto>): Result {
        for (const role of roles) {
            const res = this.validate(role)
            if (!res.isSuccess) return res
        }

        return Result.ok()
    }

    public validate({ code, speciality }: PractitionerRoleDto): Result {
        for (const role of this.roles) {
            const res = role.validateCodeAndSpeciality(code, speciality)

            if (res === PractitionerRoleValidationResult.OK) {
                return Result.ok()
            }

            if (res === PractitionerRoleValidationResult.INVALID_SPECIALITY) {
                return Result.err(`Invalid speciality! The valid are [${role.specialties.join(', ')}]`)
            }
        }

        return Result.err(`Invalid code! The valid are [${this.roles.map(r => r.code).join(', ')}]`)
    }

    public getAllRolesWithSpecialties() {
        const res = []

        this.roles.forEach(r => {
            res.push(r.getCodeWithSpecialties())
        })

        return res
    }

    public static forRoles(roles: PractitionerRoles[]): PractitionerRoleHelper {
        return new PractitionerRoleHelper(roles)
    }
}

export const practitionerRoleHelper = PractitionerRoleHelper.forRoles([
    new DoctorRole(),
    new NurseRole(),
    new AdministratorRole()
])
