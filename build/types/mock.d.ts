import { RequestMethod } from ".";
export interface Mock {
    id: string;
    desc?: String;
    method: RequestMethod;
    endpoint: string;
    responses: Response[];
}
export interface Response {
    id: string;
    desc?: string;
    latency?: number;
    statusCode: number;
    headers?: Header[];
    body: string;
}
export interface Header {
    key: string;
    value: string;
}
