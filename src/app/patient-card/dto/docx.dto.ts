export enum DocxPages {
    GENERAL_INFO
}

export type GetDocxQuery = {
    page: DocxPages
}

export const getDocxQuerySchema = {
    type: 'object',
    required: ["page"],
    additionalProperties: false,
    properties: {
        page: { enum: Object.values(DocxPages) },
    }
}
