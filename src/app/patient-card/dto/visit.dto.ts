import { ICDDto } from "../../icd/icd.dto"

export const createVisitAjvSchema = {
    type: "object",
    additionalProperties: false,
    allRequired: true,
    properties: {
        date: { type: 'string', format: 'date-time' },
        complains: { type: 'string' },
        localStatus: { type: 'string' },
        treatment: { type: 'string' },
        other: { type: 'string', nullable: true },
        faceConfiguration: {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                allRequired: true,
                properties: {
                    tooth: { type: 'number' },
                    icdId: { type: 'string' },
                }
            }
        },
    }
}

export type VisitDiagnosisDto = {
    tooth: number,
    icdName: string
    icdCode: string
}

export type CreateVisitDiagnosisDto = {
    tooth: number,
    icdId: string
}

export type VisitDto = {
    date: Date
    complains: string
    diagnosis: Array<VisitDiagnosisDto>
    localStatus: string
    treatment: string
    other: string | null
}

export type CreateVisitDto = {
    date: string
    complains: string
    diagnosis: Array<CreateVisitDiagnosisDto>
    localStatus: string
    treatment: string
    other: string | null
}
