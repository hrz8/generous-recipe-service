import { ActionParamTypes } from 'moleculer'

export interface RestfulEndpoint {
    path: string
    aliases: {
        [key: string]: string
    }
}

export interface DomainActionValidator {
    [key: string]: {
        params: ActionParamTypes
        query: ActionParamTypes
        body: ActionParamTypes
    }
}
