// GET
export interface UserGetPayloadParams {
    id: number
}

export interface UserGetPayload {
    params: UserGetPayloadParams
    query: Record<any, unknown>
    body: Record<any, unknown>
}
