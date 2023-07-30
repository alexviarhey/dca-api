export enum DocxPages {
    GENERAL_INFO = "general_info",
    PATIENT_EXAMINATION_AT_INITIAL_PLACEMENT = "patient_examination_at_initial_placement"
}

export type GetDocxQuery = {
    page: DocxPages
}

export const getDocxQuerySchema = {
    type: 'object',
    required: ["page"],
    additionalProperties: false,
    properties: {
        page: { type: "string", enum: Object.values(DocxPages) },
    }
}
