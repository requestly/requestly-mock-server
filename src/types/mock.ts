import { RequestMethod } from ".";

// TODO: Convert into classes later on
export interface Mock extends MockMetadata {
    responses: Response[] // Right now we are keeping only 1 response
}

// Useful when fetching list of mocks. Saves network bandwith
export interface MockMetadata {
    id : string
    name?: string
    desc ?: string
    method: RequestMethod
    endpoint: string
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
    filePath?: string,
    // rules: []
}
