// GET
export interface RecipeCategoryGetPayloadParams {
    id: number
}

export interface RecipeCategoryGetPayload {
    params: RecipeCategoryGetPayloadParams
    query: Record<any, unknown>
    body: Record<any, unknown>
}
