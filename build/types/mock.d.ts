import { RequestMethod } from ".";
export interface Mock extends MockMetadata {
    responses: Response[];
}
export declare enum MockType {
    API = "API",
    FILE = "FILE"
}
export interface MockMetadata {
    id: string;
    name?: string;
    desc?: string;
    method: RequestMethod;
    endpoint: string;
    ownerId?: string;
    createdTs?: string;
    updatedTs?: string;
    type?: MockType;
}
export interface Response {
    id: string;
    desc?: string;
    latency?: number;
    statusCode: number;
    headers: {
        [key: string]: string;
    };
    body: string;
}
