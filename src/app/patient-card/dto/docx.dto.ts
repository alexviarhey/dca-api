export enum DocxPages {
    GENERAL_INFO = "general_info",
    PATIENT_EXAMINATION_AT_INITIAL_PLACEMENT = "patient_examination_at_initial_placement",
    GENERAL_TREATMENT_PLAN = "general_treatment_plan",
    DENTAL_STATUS = "dental_status",
    VISIT = "visit"

}

export type GetDocxQuery = {
    page: DocxPages
    visitId?: string
}

export const getDocxQuerySchema = {
    type: 'object',
    required: ["page"],
    additionalProperties: false,
    properties: {
        page: { type: "string", enum: Object.values(DocxPages) },
        visitId: { type: "string", nullable: true},
    }
}
