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
