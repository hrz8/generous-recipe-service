// GET
export interface RecipeGetPayloadParams {
    id: number
}

export interface RecipeGetPayload {
    params: RecipeGetPayloadParams
    query: Record<any, unknown>
    body: Record<any, unknown>
}

// CREATE
export interface RecipeCreatePayloadBody {
    name: string
    description: string
    author: number
    categories: number[]
}

export interface RecipeCreatePayload {
    params: Record<any, unknown>
    query: Record<any, unknown>
    body: RecipeCreatePayloadBody
}
