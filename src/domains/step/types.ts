// CREATE
export interface StepCreatePayloadBody {
    stepNumber?: number
    description?: string
    timer?: number
    image?: string
    recipe: number
    ingredients?: {
        id: number
        amount?: number
        unit?: string
    }[]
}

export interface StepCreatePayload {
    params: Record<any, unknown>
    query: Record<any, unknown>
    body: StepCreatePayloadBody
}
