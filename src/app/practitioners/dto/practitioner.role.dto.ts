import { PractitionerCode, PractitionerSpeciality } from "../schemas/practitioner-role.schema"

export type PractitionerRoleDto = {
    code: PractitionerCode
    speciality?: PractitionerSpeciality
}
