import { HttpStatusCode } from "../enums/mockServerResponse";

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS"
}

export enum Mode {
    FIREBASE =  "FIREBASE",
}

export interface MockServerResponse {
    body: string,
    statusCode: HttpStatusCode,
    headers: { [key: string]: string }
}

export interface Log {
    mockId: string;
    createdTs: number;
    Har: any; // checkout nodejs middleware for request to HAR (https://www.npmjs.com/package/@types/har-format)
}