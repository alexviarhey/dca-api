import { PractitionerCode } from "../schemas/practitioner-role.schema"

export type PractitionerRoleDto = {
    code: PractitionerCode
    speciality: string | null
}
