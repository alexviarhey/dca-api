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
        diagnosis: {
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
    _id: string
    date: Date
    complains: string
    diagnosis: Array<VisitDiagnosisDto>
    localStatus: string
    treatment: string
    other: string | null
}

export type ShortVisitDto = {
    _id: string
    date: Date
    diagnosis: Array<VisitDiagnosisDto>
}

export type CreateVisitDto = {
    date: string
    complains: string
    diagnosis: Array<CreateVisitDiagnosisDto>
    localStatus: string
    treatment: string
    other: string | null
}
