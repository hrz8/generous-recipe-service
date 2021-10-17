// CREATE
export interface RecipeCreatePayloadBody {
    name: string
    description: string
    authorId: number
    categories: number[]
}

export interface RecipeCreatePayload {
    params: Record<any, unknown>
    query: Record<any, unknown>
    body: RecipeCreatePayloadBody
}
