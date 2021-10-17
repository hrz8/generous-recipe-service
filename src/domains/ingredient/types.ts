// CREATE
export interface IngredientCreatePayloadBody {
    name: string
    color: number
    img?: string
    categories: number[]
}

export interface IngredientCreatePayload {
    params: Record<any, unknown>
    query: Record<any, unknown>
    body: IngredientCreatePayloadBody
}
