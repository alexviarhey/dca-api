export enum DocxPages {
    GENERAL_INFO = "general_info"
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
