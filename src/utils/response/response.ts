import _isObjectLike from 'lodash/isObjectLike'
import { ErrorResponseObject } from './error'

interface ResponsePayload {
    responseMessage?: string
    apiVersion?: string
    code?: number
    error?: ErrorResponseObject | null
}

export class Response {
    public code: number
    public apiVersion: string
    public result: Record<string, any> | null
    public message: string
    public meta: any
    public error: ErrorResponseObject | null

    public constructor(
        result: Record<string, any> | null,
        meta = {},
        {
            responseMessage = '',
            apiVersion,
            code = 200,
            error = null,
        }: ResponsePayload = {} as ResponsePayload
    ) {
        if (!_isObjectLike(result) && result !== null) {
            throw new Error(
                'data must be in array or object'
            )
        }

        this.message = responseMessage
        this.code = code
        this.apiVersion = apiVersion || 'unknown'
        this.error = error
        this.result =
            _isObjectLike(result) || result === null
                ? result
                : {}
        this.meta = meta
    }
}
