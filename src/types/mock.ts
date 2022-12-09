import { RequestMethod } from ".";

// TODO: Convert into classes later on
export interface Mock {
    id : string
    desc ?: String
    method: RequestMethod
    endpoint: string
    responses: Response[] // Right now we are keeping only 1 response
}

export interface Response {
    id: string
    desc ?: string
    latency ?: number
    statusCode: number // TODO: Change this to list of acceptable status codes
    headers ?: Header[]
    body: string
    // rules: []
}

export interface Header {
    key: string
    value: string
}
