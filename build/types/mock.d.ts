import { RequestMethod } from ".";
export interface Mock {
    id: string;
    name?: string;
    desc?: string;
    method: RequestMethod;
    endpoint: string;
    responses: Response[];
    ownerId?: string;
    createdTs?: string;
    updatedTs?: string;
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
