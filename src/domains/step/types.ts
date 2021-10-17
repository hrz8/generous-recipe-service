// GET
export interface StepGetPayloadParams {
    id: number
}

export interface StepGetPayload {
    params: StepGetPayloadParams
    query: Record<any, unknown>
    body: Record<any, unknown>
}

// CREATE
export interface StepCreatePayloadBody {
    name: string
    description: string
    author: number
    categories: number[]
}

export interface StepCreatePayload {
    params: Record<any, unknown>
    query: Record<any, unknown>
    body: StepCreatePayloadBody
}
