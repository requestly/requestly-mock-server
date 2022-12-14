import { RequestMethod } from ".";

// TODO: Convert into classes later on
export interface Mock {
    id : string
    name?: string
    desc ?: string
    method: RequestMethod
    endpoint: string
    responses: Response[] // Right now we are keeping only 1 response
    ownerId?: string
    createdTs?: string
    updatedTs?: string
}

export interface Response {
    id: string
    desc ?: string
    latency ?: number
    statusCode: number // TODO: Change this to list of acceptable status codes
    headers: {[key: string]: string}
    body: string
    // rules: []
}
