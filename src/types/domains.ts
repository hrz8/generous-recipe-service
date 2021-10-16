export interface RestfulEndpoint {
    path: string
    aliases: {
        [key: string]: string
    }
}

export interface DomainActionValidator {
    [key: string]: {
        params: any
        query: any
        body: any
    }
}
